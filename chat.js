/**
 * Ask Aadil AI Chatbot Logic
 * Core Engine supporting Hybrid local fallback & Gemini 1.5 Flash client-side rest connector.
 * Auto-syncs chat history across inline section and floating panel viewports.
 */

(function () {
  // --- Initialization & State ---
  let useProxy = true; // Router queries to the secure serverless backend proxy endpoint (/api/chat)
  let chatHistory = [];
  try {
    chatHistory = JSON.parse(localStorage.getItem('ask_aadil_chat_history')) || [];
  } catch (e) {
    console.error('Error parsing chat history, resetting.', e);
    chatHistory = [];
  }

  // --- Knowledge Base for Local Fallback Mode ---
  const KNOWLEDGE_BASE = {
    about: "I'm **Aadil Hussain**, a 2nd Year B.Tech Electronics & Communication Engineering student at Guru Ghasidas University (GGU), Bilaspur. I am a passionate web developer, creator, and content maker. I love building practical web applications and editing digital media.",
    education: "I am currently pursuing my **B.Tech in Electronics & Communication Engineering (ECE)** (2nd Year) at **Guru Ghasidas University, Bilaspur**. I did my high schooling at **St. Xavier Senior Secondary School**.",
    skills: "Here is my tech stack and skill set:\n\n" +
            "• **Programming**: C, JavaScript, TypeScript\n" +
            "• **Frontend**: HTML5, CSS3, React, Tailwind CSS\n" +
            "• **Backend / BaaS**: Python, Flask, Supabase, Firebase, PostgreSQL\n" +
            "• **Tools**: GitHub, VS Code\n" +
            "• **Creative Content**: Video Editing, Thumbnail Design, YouTube SEO, Content Writing",
    projects: "I have worked on several impact-driven projects, including:\n\n" +
              "1. **CampusCircle**: A student networking and collaboration platform (React, TS, Supabase).\n" +
              "2. **JEE College Predictor**: JoSAA/CSAB rank predictor with an AI counselor (Python, Flask, JS).\n" +
              "3. **AttendNest**: Offline-first attendance tracker PWA (HTML, CSS, JS, Service Workers).\n" +
              "4. **PlateRelay**: Real-time surplus food donation app for NGOs (Firebase, Leaflet Maps).\n" +
              "5. **SolarScope**: Interactive solar energy estimator (HTML, CSS, JS).\n\n" +
              "Which one would you like to know more about?",
    campuscircle: "I built **CampusCircle** using React, TypeScript, Supabase, PostgreSQL, and Tailwind CSS. It is a student networking platform designed to break college boundaries across India. Students can discover communities, share resources, collaborate on projects, and find hackathon partners. You can check it out live [here](https://campus-circle-ruby.vercel.app/)!",
    collegepredictor: "I developed the **JEE College Predictor & AI Counseling Assistant** to help JoSAA/CSAB engineering aspirants. It uses real cutoff data to predict NIT, IIIT, and GFTI allocations based on ranks, category, gender, and quotas. It features an integrated Gemini-powered AI counselor and is built using Python, Flask, HTML, CSS, and JS. Test it live [here](https://college-predictor-2026.vercel.app/)!",
    attendnest: "I built **AttendNest**, a Progressive Web App (PWA) that operates offline using LocalStorage and Service Workers. It helps students track subject-wise attendance percentages, set reminders, and avoid shortages. Try it live [here](https://attendnest.vercel.app/)!",
    platerelay: "I developed **PlateRelay** with Ritraj and Ansu during a 36-hour hackathon to tackle food waste. It connects restaurants, messes, and event organizers with local NGOs for real-time pickup of surplus food using Firebase Firestore for sync and Leaflet Maps for discovery. You can see it live [here](https://plate-relay1.vercel.app/)!",
    solarscope: "I built **SolarScope** with Ritraj and Vanika in a 24-hour hackathon. It is an interactive solar potential calculator featuring custom client-side mathematical projection curves and a globe dashboard designed with CSS radial gradients. Check it out live [here](https://solarscope-one.vercel.app/)!",
    hackathons: "I love participating in hackathons! They push me to design and develop working software under tight deadlines. I built **PlateRelay** (a 36-hour food-waste NGO connector) and **SolarScope** (a 24-hour solar potential estimator) with teammate collaborations in college events.",
    clubs: "I am an active member of two main campus clubs at GGU:\n\n" +
           "- **Chalchitra**: GGU's film-making club, where I work on directing, video editing, and post-production.\n" +
           "- **Udaan**: The official GGU student magazine club, focusing on writing and layout design.",
    goals: "My primary goal is to master full-stack software development and explore hardware-software interfaces in ECE. I aim to build SaaS tools that solve real-world problems, participate in national hackathons, and secure developer internships to gain industry experience.",
    contact: "Let's connect! You can reach out to me via:\n\n" +
             "• **Email**: [aadil2githubb@gmail.com](mailto:aadil2githubb@gmail.com)\n" +
             "• **GitHub**: [aadil2codes](https://github.com/aadil2codes)\n" +
             "• **LinkedIn**: [Aadil Hussain](https://www.linkedin.com/in/aadil-‌-643910375)\n" +
             "• **Instagram**: [@aa.dill._](https://www.instagram.com/aa.dill._?igsh=ODE1N3Y3NnM0Mm0z)\n\n" +
             "I look forward to discussing collaborative projects or web opportunities!"
  };

  // --- Local Keyword Engine Matcher ---
  function getLocalResponse(input) {
    const text = input.toLowerCase().trim();

    if (text.includes('campuscircle') || text.includes('campus circle')) {
      return KNOWLEDGE_BASE.campuscircle;
    }
    if (text.includes('predictor') || text.includes('jee') || text.includes('josaa') || text.includes('csab') || text.includes('counseling')) {
      return KNOWLEDGE_BASE.collegepredictor;
    }
    if (text.includes('attendnest') || text.includes('attendance')) {
      return KNOWLEDGE_BASE.attendnest;
    }
    if (text.includes('platerelay') || text.includes('plate relay') || text.includes('food') || text.includes('ngo') || text.includes('waste')) {
      return KNOWLEDGE_BASE.platerelay;
    }
    if (text.includes('solarscope') || text.includes('solar scope') || text.includes('solar potential') || text.includes('solar energy')) {
      return KNOWLEDGE_BASE.solarscope;
    }
    if (text.includes('projects') || text.includes('built') || text.includes('made') || text.includes('portfolio') || text.includes('develop')) {
      return KNOWLEDGE_BASE.projects;
    }
    if (text.includes('skills') || text.includes('technologies') || text.includes('languages') || text.includes('tools') || text.includes('stack')) {
      return KNOWLEDGE_BASE.skills;
    }
    if (text.includes('education') || text.includes('study') || text.includes('studying') || text.includes('college') || text.includes('university') || text.includes('btech') || text.includes('ece') || text.includes('ggu')) {
      return KNOWLEDGE_BASE.education;
    }
    if (text.includes('hackathon') || text.includes('hackathons') || text.includes('competition')) {
      return KNOWLEDGE_BASE.hackathons;
    }
    if (text.includes('club') || text.includes('clubs') || text.includes('chalchitra') || text.includes('udaan') || text.includes('activities')) {
      return KNOWLEDGE_BASE.clubs;
    }
    if (text.includes('youtube') || text.includes('video') || text.includes('editing') || text.includes('thumbnail') || text.includes('content creator') || text.includes('creative')) {
      return "I started my YouTube channel right when the lockdown ended and classes were starting. Initially, I uploaded two videos a day, later dropping to one when classes got busier. It was a journey of learning video editing, script writing, YouTube SEO, and most of all, patience and consistency. After 6-7 months, one of my videos went viral, which eventually led to monetization and earning my first income of around $100. I'm really proud of the skills and experience I gained! You can click on the **Content Creator** card in the About section of the website to read my full story.";
    }
    if (text.includes('goals') || text.includes('future') || text.includes('career') || text.includes('ambition') || text.includes('aim')) {
      return KNOWLEDGE_BASE.goals;
    }
    if (text.includes('contact') || text.includes('email') || text.includes('linkedin') || text.includes('github') || text.includes('social')) {
      return KNOWLEDGE_BASE.contact;
    }
    if (text.includes('about') || text.includes('aadil') || text.includes('who are you') || text.includes('who is') || text.includes('introduce') || text.includes('bio')) {
      return KNOWLEDGE_BASE.about;
    }
    if (text.includes('from') || text.includes('live') || text.includes('location') || text.includes('hometown') || text.includes('place') || text.includes('where is')) {
      return "I am currently based in **Bilaspur, Chhattisgarh**, where I am studying at Guru Ghasidas University (GGU). Originally, I am from India!";
    }
    if (text.includes('who built you') || text.includes('who created you') || text.includes('who made you') || text.includes('creator') || text.includes('programmer')) {
      return "I was built by **Aadil Hussain** as his digital twin AI assistant to answer questions about his skills, projects, and educational journey.";
    }
    if (text.includes('resume') || text.includes('cv')) {
      return "You can view my resume by clicking the **View Resume** button in the About section or download it directly [here](assets/resume.pdf)!";
    }
    if (text.includes('i see') || text.includes('ah i see') || text.includes('got it') || text === 'ok' || text === 'okay' || text.includes('makes sense') || text.includes('understand') || text === 'nice' || text === 'cool' || text === 'gotcha') {
      return "Awesome! Let me know if you have any questions about my projects, skills, academic path, or anything else you'd like to explore.";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return "Hi there! I am Aadil's digital twin chatbot. Ask me anything about my academic journey, tech stack, active projects, or future ambitions. I'll do my best to answer!";
    }
    if (text.includes('thank') || text.includes('thanks') || text.includes('awesome') || text.includes('great')) {
      return "You're very welcome! Let me know if you want to know anything else about my projects or background.";
    }

    // Default fallback
    return "I don't have information about that yet. Please feel free to ask me about my projects (like CampusCircle or JEE College Predictor), skills, studies, hackathon experiences, or campus clubs!";
  }

  // --- Serverless Proxy API Connector ---
  async function callNvidiaAPI(userPrompt) {
    if (window.location.protocol === 'file:') {
      throw new Error("Running locally via file:// protocol. The backend proxy is only available when served on a web server. Please run 'node server.js' and visit http://localhost:3000");
    }

    // Detect if running on a local development port other than 3000 (e.g., Live Server on 5500)
    // and route to the local Node.js proxy on port 3000.
    let url = '/api/chat';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (window.location.port !== '3000' && window.location.port !== '') {
        url = 'http://localhost:3000/api/chat';
      }
    }

    // Prepare OpenAI-compatible message history from chatHistory (last 10 turns to keep it fast)
    const messagesToSend = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })).slice(-10);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: userPrompt,
        messages: messagesToSend
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.answer) {
      throw new Error("No answer returned from backend proxy.");
    }
    return data.answer;
  }

  // --- UI Helpers & Utilities ---

  function formatMessageText(text) {
    // Safe HTML escapes
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Format bold (**bold**)
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Format inline code (`code`)
    html = html.replace(/`(.*?)`/g, "<code class='bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-xs'>$1</code>");

    // Format links ([text](url))
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #06B6D4; text-decoration: underline; font-weight: 500;">$1</a>');

    // Format list items (lines starting with - or * )
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return `• ${trimmed.substring(2)}`;
      }
      return line;
    });

    return processedLines.join('<br>');
  }

  function createMessageElement(sender, text, time) {
    const isAi = sender === 'ai';
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${isAi ? 'ai-message' : 'user-message'}`;

    const avatar = isAi ? '🤖' : '👤';

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'message-content-wrapper';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = formatMessageText(text);

    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = time;

    contentWrapper.appendChild(bubble);
    contentWrapper.appendChild(timeSpan);

    msgDiv.innerHTML = `<div class="message-avatar">${avatar}</div>`;
    msgDiv.appendChild(contentWrapper);

    return msgDiv;
  }

  function appendMessageToUI(sender, text, time) {
    const inlineContainer = document.getElementById('aiChatMessagesInline');
    const panelContainer = document.getElementById('aiChatMessagesPanel');

    if (inlineContainer) {
      inlineContainer.appendChild(createMessageElement(sender, text, time));
    }
    if (panelContainer) {
      panelContainer.appendChild(createMessageElement(sender, text, time));
    }
  }

  function showTypingIndicators() {
    const inlineContainer = document.getElementById('aiChatMessagesInline');
    const panelContainer = document.getElementById('aiChatMessagesPanel');

    if (document.querySelector('.typing-indicator-container')) return;

    const createIndicator = () => {
      const div = document.createElement('div');
      div.className = 'chat-message ai-message typing-indicator-container';
      div.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content-wrapper">
          <div class="message-bubble" style="padding: 10px 14px;">
            <div class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
        </div>
      `;
      return div;
    };

    if (inlineContainer) inlineContainer.appendChild(createIndicator());
    if (panelContainer) panelContainer.appendChild(createIndicator());

    scrollToBottom();
  }

  function removeTypingIndicators() {
    const indicators = document.querySelectorAll('.typing-indicator-container');
    indicators.forEach(ind => ind.remove());
  }

  function scrollToBottom() {
    const inlineContainer = document.getElementById('aiChatMessagesInline');
    const panelContainer = document.getElementById('aiChatMessagesPanel');

    if (inlineContainer) {
      inlineContainer.scrollTop = inlineContainer.scrollHeight;
    }
    if (panelContainer) {
      panelContainer.scrollTop = panelContainer.scrollHeight;
    }
  }

  function saveChatHistory() {
    localStorage.setItem('ask_aadil_chat_history', JSON.stringify(chatHistory));
  }

  function renderChatHistory() {
    const inlineContainer = document.getElementById('aiChatMessagesInline');
    const panelContainer = document.getElementById('aiChatMessagesPanel');

    if (chatHistory.length > 0) {
      if (inlineContainer) {
        inlineContainer.innerHTML = '';
        chatHistory.forEach(msg => {
          inlineContainer.appendChild(createMessageElement(msg.sender, msg.text, msg.time));
        });
      }
      if (panelContainer) {
        panelContainer.innerHTML = '';
        chatHistory.forEach(msg => {
          panelContainer.appendChild(createMessageElement(msg.sender, msg.text, msg.time));
        });
      }
      
      const suggestionsRow = document.getElementById('chatSuggestionsRow');
      if (suggestionsRow) {
        suggestionsRow.style.display = 'none';
      }
      scrollToBottom();
    } else {
      if (inlineContainer) {
        inlineContainer.innerHTML = `
          <div class="chat-empty-state" id="chatEmptyState">
            <div class="empty-state-logo">✨</div>
            <h1 class="empty-state-title">ASK AADIL AI</h1>
            <p class="empty-state-subtitle">Curious about my projects, skills, or journey?</p>
            <p class="empty-state-desc">Ask anything and get instant answers from a digital version of me.</p>
          </div>
        `;
      }
      const suggestionsRow = document.getElementById('chatSuggestionsRow');
      if (suggestionsRow) {
        suggestionsRow.style.display = 'flex';
      }
    }
  }

  function clearChat() {
    chatHistory = [];
    localStorage.removeItem('ask_aadil_chat_history');

    const inlineContainer = document.getElementById('aiChatMessagesInline');
    const panelContainer = document.getElementById('aiChatMessagesPanel');

    if (inlineContainer) {
      inlineContainer.innerHTML = `
        <div class="chat-empty-state" id="chatEmptyState">
          <div class="empty-state-logo">✨</div>
          <h1 class="empty-state-title">ASK AADIL AI</h1>
          <p class="empty-state-subtitle">Curious about my projects, skills, or journey?</p>
          <p class="empty-state-desc">Ask anything and get instant answers from a digital version of me.</p>
        </div>
      `;
    }

    if (panelContainer) {
      panelContainer.innerHTML = `
        <div class="chat-message ai-message">
          <div class="message-content-wrapper">
            <div class="message-bubble">
              👋 Hello! I'm your AI assistant. Ask me anything about Aadil's projects, studies, or skills!
            </div>
            <span class="message-time">Just now</span>
          </div>
        </div>
      `;
    }

    const suggestionsRow = document.getElementById('chatSuggestionsRow');
    if (suggestionsRow) {
      suggestionsRow.style.display = 'flex';
    }
  }

  // --- Send Message Processing ---
  async function sendMessage(prompt) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Hide empty state and suggestions on first message
    if (chatHistory.length === 0) {
      const emptyState = document.getElementById('chatEmptyState');
      if (emptyState) emptyState.remove();
      const suggestionsRow = document.getElementById('chatSuggestionsRow');
      if (suggestionsRow) suggestionsRow.style.display = 'none';
    }

    // Append user message
    chatHistory.push({ sender: 'user', text: prompt, time: time });
    saveChatHistory();
    appendMessageToUI('user', prompt, time);
    scrollToBottom();

    // Show typing
    showTypingIndicators();

    let responseText = '';
    try {
      if (useProxy) {
        responseText = await callNvidiaAPI(prompt);
      } else {
        // Subtle delay for conversational feel
        await new Promise(resolve => setTimeout(resolve, 800));
        responseText = getLocalResponse(prompt);
      }
    } catch (e) {
      console.error(e);
      responseText = "I hit a snag trying to contact my NVIDIA NIM API core. \n\n" +
                     `*Error Details:* ${e.message}\n\n` +
                     "**Local Fallback Response:**\n\n" +
                     getLocalResponse(prompt);
    } finally {
      removeTypingIndicators();
    }

    const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatHistory.push({ sender: 'ai', text: responseText, time: aiTime });
    saveChatHistory();
    appendMessageToUI('ai', responseText, aiTime);
    scrollToBottom();
  }

  // --- Setup Document Events ---
  function initChatbot() {
    renderChatHistory();

    // 2. Form Input Handling
    const inlineForm = document.getElementById('aiChatInputAreaInline');
    const panelForm = document.getElementById('aiChatInputAreaPanel');
    const inlineInput = document.getElementById('aiChatInputInline');
    const panelInput = document.getElementById('aiChatInputPanel');

    if (inlineForm && inlineInput) {
      inlineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = inlineInput.value.trim();
        if (text) {
          inlineInput.value = '';
          sendMessage(text);
        }
      });
    }

    if (panelForm && panelInput) {
      panelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = panelInput.value.trim();
        if (text) {
          panelInput.value = '';
          sendMessage(text);
        }
      });
    }

    // 3. Clear Chat Buttons
    const clearChatInline = document.getElementById('clearChatInline');
    const clearChatPanel = document.getElementById('clearChatPanel');
    if (clearChatInline) clearChatInline.addEventListener('click', clearChat);
    if (clearChatPanel) clearChatPanel.addEventListener('click', clearChat);

    // 4. Panel Opening / Closing Actions
    const aiChatFloatBtn = document.getElementById('aiChatFloatBtn');
    const aiChatPanel = document.getElementById('aiChatPanel');
    const closeChatPanelBtn = document.getElementById('closeChatPanelBtn');

    if (aiChatFloatBtn && aiChatPanel) {
      aiChatFloatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        aiChatPanel.classList.toggle('active');
        scrollToBottom();
      });
    }

    if (closeChatPanelBtn && aiChatPanel) {
      closeChatPanelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        aiChatPanel.classList.remove('active');
      });
    }

    // Dismiss panel click outside
    document.addEventListener('click', (e) => {
      if (aiChatPanel && aiChatPanel.classList.contains('active')) {
        if (!aiChatPanel.contains(e.target) && !aiChatFloatBtn.contains(e.target)) {
          aiChatPanel.classList.remove('active');
        }
      }
    });

    // 6. Suggestion Chips Event Delegation
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.suggestion-chip');
      if (chip) {
        const text = chip.getAttribute('data-prompt') || chip.textContent.trim();
        if (text) {
          sendMessage(text);
        }
      }
    });
  }

  // --- Initializer Run ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
