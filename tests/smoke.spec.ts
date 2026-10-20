import { test, expect, type Page } from '@playwright/test'

/** Collect console errors and failed same-origin requests for a page. */
function watch(page: Page) {
  const errors: string[] = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('response', (r) => {
    if (r.status() >= 400 && r.url().startsWith('http://localhost:4173') && !r.url().includes('/__not-found__')) errors.push(`${r.status()} ${r.url()}`)
  })
  return errors
}

test.beforeEach(async ({ context }) => {
  // Skip the once-per-session intro so tests interact immediately.
  await context.addInitScript(() => sessionStorage.setItem('dx-intro', '1'))
})

test('home loads with key sections, contact details and no console errors', async ({ page }) => {
  const errors = watch(page)
  await page.goto('/')
  await expect(page).toHaveTitle(/Directrix Technologies/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software and AI')
  for (const id of ['services', 'packages', 'process', 'industries', 'work', 'faq', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  await expect(page.locator('a[href="tel:+916303390400"]').first()).toBeAttached()
  await expect(page.locator('a[href="mailto:directrixtechnologies@gmail.com"]').first()).toBeAttached()
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld.join(' ')).toContain('"telephone":"+916303390400"')
  expect(ld.join(' ')).toContain('"email":"directrixtechnologies@gmail.com"')
  await page.mouse.wheel(0, 4000)
  await page.waitForTimeout(500)
  expect(errors).toEqual([])
})

test('home HTML is pre-rendered (content present without JavaScript)', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('Software and AI that move')
  expect(html).toContain('<link rel="canonical"')
})

test('navigation works', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Work' }).click()
  } else {
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work' }).click()
  }
  await expect(page).toHaveURL(/\/work$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Case studies')
})

test('booking button opens the discovery-call dialog', async ({ page }) => {
  await page.goto('/')
  // The nav button is hidden on phones, so click the first visible booking CTA.
  await page.locator('[data-cta="book-call"]:visible').first().click()
  const dialog = page.getByRole('dialog', { name: /discovery call/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('a[href="tel:+916303390400"]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('contact form validates and submits', async ({ page }) => {
  await page.goto('/contact')
  const form = page.getByRole('form', { name: 'Project enquiry form' })
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(form.getByText('Please enter your name')).toBeVisible()
  await expect(form.getByText('Please enter a valid work email')).toBeVisible()
  await form.getByLabel('Name').fill('Test Person')
  await form.getByLabel('Work email').fill('test@example.com')
  await form.getByLabel('Company').fill('Example Ltd')
  await form.getByLabel('What do you want to achieve?').fill('We want an internal knowledge assistant for our policy documents.')
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(page.getByText('Thanks, your enquiry is in.')).toBeVisible()
})

test('package CTA pre-fills the enquiry form', async ({ page }) => {
  await page.goto('/contact?package=knowledge-assistant-pilot#enquiry')
  await expect(page.locator('p', { hasText: 'Enquiring about:' })).toContainText('Knowledge Assistant Pilot')
})

const caseStudies = ['documind', 'knowledge-navigator', 'nusqa', 'workforceiq', 'enterprise-launch-workflow-platform']
for (const slug of caseStudies) {
  test(`case study renders: ${slug}`, async ({ page }) => {
    const errors = watch(page)
    await page.goto(`/work/${slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Project outcome' })).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('publishing rules: no pending metrics, confidential and unconfirmed orgs hidden', async ({ request }) => {
  for (const slug of ['cineassist', 'smartfind', 'fingercheck-2', 'workforceiq', 'modelops-console', 'cinegear-digital']) {
    const html = await (await request.get(`/work/${slug}`)).text()
    expect(html, slug).not.toMatch(/\b(60|20|98|89|50)%|90%\+/)
  }
  const wf = await (await request.get('/work/workforceiq')).text()
  expect(wf).not.toContain('CineGear')
  const p01 = await (await request.get('/work/enterprise-launch-workflow-platform')).text()
  expect(p01).toContain('Confidential enterprise client')
  expect(p01).not.toMatch(/Google/)
  const nusqa = await (await request.get('/work/nusqa')).text()
  expect(nusqa).toContain('not medical advice')
})

test('unknown route shows the 404 page', async ({ page }) => {
  await page.goto('/this-does-not-exist')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('wrong turn')
})
