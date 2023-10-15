# Martin

<img src="assets/avatar.png" width="50%" alt="Avatar">

Created for UF AI Days Gator Hack (Sponsored by Verizon)

https://devpost.com/software/kim-s-convenience

## Installation and Local Deployment

Please contact `zhang.jonathan@ufl.edu` to be provided access to our authentication key for the OpenAI API.

**Step 0:** Download requirements.

- Node.js
- npm
- Python 3

**Step 1:** Clone the repository.

`git clone https://github.com/victorpolisetty/martin-verizon.git`

**Step 2:** Install requirements.

`npm install`

Potential missing packages
- Cors: `npm install cors`
- OpenAI: `pip install openai`

**Step 3:** Start the backend server.

`export API_KEY="INSERT_AUTHENTICATION_KEY_HERE"`

`node backend/chat_gpt_api.js`

**Step 4:** Start the frontend web app in a new terminal. It may ask to switch ports, click YES.

`npm start`

**Step 5:**  Access the React web app on the provided localhost link in a Chrome-based browser.

## Appendix

[Prompt Input Structure](https://docs.google.com/document/d/1-zlETkh-fIw4FNVqavoH0a2pIahGOS52Z54jz0YFaAA/edit?usp=sharing)

[Fine-Tuning Prompt-Answer Database](https://docs.google.com/document/d/1gAoCvh5kR5Kx-YyVUNBxd91vlNi49J-1v8jW0NjO__I/edit?usp=sharing)
