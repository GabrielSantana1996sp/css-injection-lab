# css-injection-lab
"Educational purposes only"
#  CSS Injection Exfiltration Lab

A hands-on, containerized security laboratory demonstrating how an attacker can exfiltrate sensitive data (retrieved securely from a MySQL database) using **CSS attribute selectors** and external resource requests. 

Built to demonstrate DOM manipulation vulnerabilities and the risks of improper input sanitization or missing Content Security Policies (CSP).

---

##  Architecture & Tech Stack

This lab is fully containerized using **Podman** and **Podman-Compose** to ensure a secure, isolated, and reproducible environment on Linux (Debian).

- **Host Environment:** Debian Linux
- **Container Engine:** Podman
- **Backend:** Node.js (`http`, `mysql2`)
- **Database:** MySQL 8.0 (Auto-seeded via initialization scripts)
- **Attack Vector:** CSS Attribute Selectors (`[attribute^="value"]`) & Blind Exfiltration

---

##  Project Structure

```text
css-injection-lab/
├── Containerfile         # Custom container recipe for the Node.js backend
├── docker-compose.yml    # Orchestrates MySQL and the vulnerable App
├── package.json          # Node.js dependencies
├── schema.sql            # MySQL auto-seeding script (Database & Table creation)
├── server.js             # Vulnerable backend serving DB data to DOM
└── PA.txt                # Attack payload reference (Colinha)
