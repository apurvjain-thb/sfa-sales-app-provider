#!/usr/bin/env python3
"""Local dev server that mirrors Vercel routing for the Roche SFA prototype.

  /                       -> /dashboards/
  /dashboards             -> /dashboards/index.html
  /beat-plan              -> /beat-plan/index.html
  /beat-plan/<slug>       -> /beat-plan/index.html  (slug read client-side from URL)
  /contacts               -> /contacts/index.html
  /contacts/<slug>        -> /contacts/index.html
  /tasks                  -> /tasks/index.html
  /tasks/<id>             -> /tasks/index.html
  /assets/...             -> served as-is
"""
import http.server, socketserver, os, re, urllib.parse, sys

PORT = int(os.environ.get("PORT", 8080))
ROOT = os.path.dirname(os.path.abspath(__file__))

SECTIONS = ("beat-plan", "accounts", "leads", "deals", "activity", "contacts", "tasks", "login")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/" or path == "":
            self.send_response(302)
            self.send_header("Location", "/login")
            self.end_headers()
            return

        clean = path.rstrip("/")

        # Top-level section routes -> serve that section's index.html
        for s in SECTIONS + ("dashboards", "profile", "evaluate"):
            if clean == "/" + s:
                self.path = "/" + s + "/index.html"
                return super().do_GET()

        # Dynamic detail routes under each section
        m = re.match(r"^/(beat-plan|accounts|leads|deals|activity|contacts|tasks|login|profile)/([^/]+)/?$", path)
        if m:
            section, slug = m.group(1), m.group(2)
            file_path = os.path.join(ROOT, section, slug)
            # only rewrite if it's NOT a real file/directory under that section
            if not os.path.exists(file_path):
                self.path = "/" + section + "/index.html"
                return super().do_GET()

        return super().do_GET()

    def log_message(self, fmt, *args):
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), fmt % args))


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving Roche SFA prototype at http://localhost:{PORT}")
    print("Press Ctrl+C to stop.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
