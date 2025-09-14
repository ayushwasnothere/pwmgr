# Pwmgr

**Pwmgr** is a lightweight, privacy-first **Bitwarden clone** built as a **Chrome extension**.  
It lets you manage, save, and generate passwords with **full security and local privacy**.

All data is stored securely in **local storage**, with usernames and passwords encrypted using a **master key**.  
Only the user with the master key can decrypt and access credentials.

---

## Features

- 🔑 **Master Key Encryption** – all credentials are encrypted and accessible only with your master key
- 🗄 **Local Storage Only** – no external servers, everything stays on your device
- 🔐 **Password Manager** – save and organize your login credentials securely
- ⚡ **Password Generator** – generate strong, random, and customizable passwords
- 🎨 Built with **React** + **Tailwind CSS** for a sleek, responsive UI
- 🧩 Chrome extension for quick, seamless access in your browser

---

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React + Tailwind CSS        |
| Platform | Chrome Extension            |
| Storage  | LocalStorage (encrypted)    |
| Security | Master Key-based encryption |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayushwasnothere/pwmgr.git
cd pwmgr
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Build the extension

```bash
pnpm build
# or
npm run build
```

### 4. Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top-right corner)
3. Click **Load unpacked** and select the `dist/` folder from the build step

The extension should now appear in your Chrome toolbar.

---

## Usage

1. Set up your **master key** on first launch
2. Add, save, and manage your credentials securely
3. Use the built-in **password generator** to create strong passwords
4. Autofill or copy credentials when needed — all encrypted and safe

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature"
```

4. Push to your branch:

```bash
git push origin feature-name
```

5. Open a pull request

---

## License

[MIT](LICENSE)

---

## Project Preview

```bash
$ pnpm build
> Extension built successfully
[Security] Master key required to unlock credentials
[Storage] Credentials stored securely in local storage
```

A secure, private, and user-friendly password manager — right in your browser. 🔒
