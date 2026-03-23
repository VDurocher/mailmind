# -*- coding: utf-8 -*-
"""
Tests UI Playwright pour MailMind.
Verifie les pages principales, l'auth, le dashboard et l'inbox.
"""

import sys
import os
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"
EMAIL = "dev@mailmind.test"
PASSWORD = "DevTest2026"
SCREENSHOT_DIR = "tests/screenshots"

os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def shot(page, name):
    path = f"{SCREENSHOT_DIR}/{name}.png"
    page.screenshot(path=path, full_page=True)
    print(f"  [screenshot] {path}")

def test_landing(page):
    print("\n[1] Landing page...")
    page.goto(BASE_URL, wait_until="networkidle")
    shot(page, "01_landing")

    title = page.title()
    print(f"  Title: {title}")

    assert page.locator("h1").count() > 0, "H1 manquant"
    print("  OK: H1 present")

    # Bouton CTA
    links = page.get_by_role("link").all()
    cta_found = False
    for link in links:
        try:
            txt = link.inner_text().lower()
            if any(k in txt for k in ["start", "try", "demo", "sign", "login", "get started"]):
                print(f"  OK: CTA trouve: '{link.inner_text()[:40]}'")
                cta_found = True
                break
        except Exception:
            pass
    if not cta_found:
        print("  WARN: Aucun CTA trouve")

def test_login(page):
    print("\n[2] Login...")
    page.goto(f"{BASE_URL}/login", wait_until="networkidle")
    shot(page, "02_login")

    email_input = page.locator('input[type="email"]')
    password_input = page.locator('input[type="password"]')

    assert email_input.count() > 0, "Champ email manquant"
    assert password_input.count() > 0, "Champ password manquant"
    print("  OK: Formulaire de login present")

    email_input.first.fill(EMAIL)
    password_input.first.fill(PASSWORD)
    shot(page, "02_login_filled")

    submit = page.locator('button[type="submit"]')
    if submit.count() == 0:
        buttons = page.get_by_role("button").all()
        for b in buttons:
            try:
                txt = b.inner_text().lower()
                if any(k in txt for k in ["sign in", "login", "connexion", "se connecter"]):
                    submit = b
                    break
            except Exception:
                pass

    if hasattr(submit, 'first'):
        submit.first.click()
    else:
        submit.click()

    try:
        page.wait_for_url(lambda url: "/login" not in url, timeout=10000)
        print(f"  OK: Redirige vers: {page.url}")
    except Exception:
        shot(page, "02_login_error")
        raise Exception(f"Redirection echouee, toujours sur: {page.url}")

    shot(page, "03_post_login")

def test_dashboard(page):
    print("\n[3] Dashboard...")
    page.goto(f"{BASE_URL}/dashboard", wait_until="networkidle")
    page.wait_for_timeout(1500)
    shot(page, "04_dashboard")

    # Sidebar
    sidebar = page.locator("nav, aside")
    if sidebar.count() > 0:
        print("  OK: Sidebar presente")
    else:
        print("  WARN: Sidebar non detectee")

    # Cards
    cards = page.locator(".grid > *")
    print(f"  INFO: {cards.count()} elements dans la grille principale")

    # Headings
    headings = []
    for h in page.locator("h1, h2, h3").all():
        try:
            headings.append(h.inner_text())
        except Exception:
            pass
    print(f"  Headings: {headings[:5]}")

    # Pas d'erreurs visibles
    content = page.content()
    for err in ["INTERNAL_ERROR", "Something went wrong", "500"]:
        if err in content:
            print(f"  WARN: Texte d'erreur detecte: '{err}'")

def test_inbox(page):
    print("\n[4] Inbox...")
    page.goto(f"{BASE_URL}/inbox", wait_until="networkidle")
    page.wait_for_timeout(1500)
    shot(page, "05_inbox")

    # Chercher le bouton Analyze
    analyze_btn = None
    for btn in page.get_by_role("button").all():
        try:
            txt = btn.inner_text().lower()
            if any(k in txt for k in ["analyz", "new", "compose", "email"]):
                analyze_btn = btn
                print(f"  OK: Bouton trouve: '{btn.inner_text()[:40]}'")
                break
        except Exception:
            pass

    if analyze_btn:
        analyze_btn.click()
        page.wait_for_timeout(800)
        shot(page, "06_analyze_modal")

        modal = page.locator("[role='dialog']")
        if modal.count() > 0:
            print("  OK: Modal ouvert")
            try:
                print(f"  Contenu modal: {modal.first.inner_text()[:80]}...")
            except Exception:
                pass
            # Fermer
            page.keyboard.press("Escape")
            page.wait_for_timeout(400)
        else:
            print("  WARN: Modal non detecte apres clic")
    else:
        print("  WARN: Bouton analyser non trouve")

def test_navigation(page):
    print("\n[5] Navigation...")
    routes = [
        ("/dashboard", "Dashboard"),
        ("/inbox", "Inbox"),
        ("/settings", "Settings"),
    ]
    for path, name in routes:
        page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded")
        page.wait_for_timeout(600)
        if path in page.url:
            print(f"  OK: {name} -> {page.url}")
        else:
            print(f"  WARN: {name} redirige vers {page.url}")

def test_responsive(page):
    print("\n[6] Responsive (mobile 375px)...")
    page.set_viewport_size({"width": 375, "height": 812})
    page.goto(f"{BASE_URL}/dashboard", wait_until="networkidle")
    page.wait_for_timeout(800)
    shot(page, "07_mobile_dashboard")

    page.goto(f"{BASE_URL}/inbox", wait_until="networkidle")
    page.wait_for_timeout(800)
    shot(page, "08_mobile_inbox")
    print("  OK: Screenshots mobile prises")

def main():
    print("=" * 55)
    print("  MailMind - Tests UI Playwright")
    print("=" * 55)

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        tests = [
            ("Landing Page", test_landing),
            ("Login + Auth", test_login),
            ("Dashboard", test_dashboard),
            ("Inbox", test_inbox),
            ("Navigation", test_navigation),
            ("Responsive", test_responsive),
        ]

        for name, fn in tests:
            try:
                fn(page)
                results.append((name, True, None))
            except Exception as e:
                try:
                    shot(page, f"ERROR_{name.replace(' ', '_')}")
                except Exception:
                    pass
                print(f"  FAIL: {e}")
                results.append((name, False, str(e)))

        browser.close()

    print("\n" + "=" * 55)
    print("  Resultats")
    print("=" * 55)
    passed = sum(1 for _, ok, _ in results if ok)
    for name, ok, err in results:
        icon = "PASS" if ok else "FAIL"
        suffix = f" -- {err[:70]}" if err else ""
        print(f"  [{icon}] {name}{suffix}")
    print(f"\n  {passed}/{len(results)} tests passes")
    print(f"  Screenshots -> tests/screenshots/")

    return 0 if passed == len(results) else 1

if __name__ == "__main__":
    sys.exit(main())
