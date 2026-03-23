# -*- coding: utf-8 -*-
"""Verifie le contexte autour du '500' detecte dans le dashboard."""

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"
EMAIL = "dev@mailmind.test"
PASSWORD = "DevTest2026"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Login
    page.goto(f"{BASE_URL}/login", wait_until="networkidle")
    page.locator('input[type="email"]').fill(EMAIL)
    page.locator('input[type="password"]').fill(PASSWORD)
    page.locator('button[type="submit"]').click()
    page.wait_for_url(lambda url: "/login" not in url, timeout=10000)

    # Dashboard
    page.goto(f"{BASE_URL}/dashboard", wait_until="networkidle")
    page.wait_for_timeout(2000)

    content = page.content()

    # Trouver toutes les occurrences de "500" avec contexte
    idx = 0
    occurrences = []
    while True:
        idx = content.find("500", idx)
        if idx == -1:
            break
        start = max(0, idx - 40)
        end = min(len(content), idx + 40)
        occurrences.append(content[start:end].replace("\n", " ").strip())
        idx += 3

    print(f"Occurrences de '500' dans le HTML ({len(occurrences)} total):")
    for i, ctx in enumerate(occurrences[:10]):
        print(f"  [{i+1}] ...{ctx}...")

    # Verifier si c'est visible par l'utilisateur
    visible_errors = page.locator("text=500").all()
    print(f"\nElements '500' VISIBLES: {len(visible_errors)}")

    # Toasts d'erreur
    toasts = page.locator("[data-sonner-toast]").all()
    print(f"Toasts Sonner: {len(toasts)}")

    browser.close()
