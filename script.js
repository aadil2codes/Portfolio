/**
 * Aadil - Premium Developer Portfolio Hero Section Interactivity
 * Focuses on high-end Framer/Linear-style mouse tracking, soft glows, and interactive parallax.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Trigger page fade-in on load
  document.body.classList.add('loaded');
  
  // 1. Dynamic Cursor Ambient Glow Follower
  const ambientGlow = document.getElementById('ambientGlow');
  
  if (ambientGlow) {
    document.addEventListener('mousemove', (e) => {
      // Set radial gradient coordinates following the cursor with a subtle opacity mapping
      const x = e.clientX;
      const y = e.clientY;
      
      ambientGlow.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(255, 122, 0, 0.04) 0%, transparent 55%),
        radial-gradient(circle at 10% 20%, rgba(255, 122, 0, 0.02) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255, 122, 0, 0.02) 0%, transparent 40%),
        #0A0A0A
      `;
    });
  }


  // 3. Linear-Style Card Radial Glow Coordinate Tracker
  const statsCard = document.getElementById('statsCard');
  const statsCardGlow = document.getElementById('statsCardGlow');

  if (statsCard && statsCardGlow) {
    statsCard.addEventListener('mousemove', (e) => {
      const rect = statsCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      statsCard.style.setProperty('--x', `${x}px`);
      statsCard.style.setProperty('--y', `${y}px`);
      
      // Fine card border highlight coordinates
      statsCard.style.borderColor = 'rgba(255, 122, 0, 0.2)';
    });

    statsCard.addEventListener('mouseleave', () => {
      statsCard.style.borderColor = ''; // reset to stylesheet default
    });
  }

  // 4. Navigation Dynamic Active States and Smooth Triggers
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active state from all items
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active state to the clicked nav link
      link.classList.add('active');
    });
  });

  // 5. Interactive Click Glow Effect on CTA Buttons
  const buttons = document.querySelectorAll('.btn, .primary-cta');
  
  buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
      button.style.transform = 'scale(0.97) translateY(-1px)';
    });
    
    button.addEventListener('mouseup', () => {
      button.style.transform = '';
    });
  });

  // ==========================================================================
  // 6. ABOUT ME INTERACTIVE TILT CARD SHOWCASE
  // ==========================================================================
  const tiltCard = document.getElementById('interactiveTiltCard');
  const tiltGlare = document.getElementById('tiltCardGlare');

  if (tiltCard && tiltGlare) {
    const tiltFactor = 20; // Match React demo.tsx's tiltFactor

    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      // Relative mouse offset coordinates inside the card bounds
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Map offset to -1 to 1 percentage scale (doubled from -0.5 to 0.5 to achieve full rotation range)
      const pctX = ((x / rect.width) - 0.5) * 2;
      const pctY = ((y / rect.height) - 0.5) * 2;

      // Compute tilt factors (outward rotation towards cursor, matching React mathematical direction)
      const tiltX = -(pctY * tiltFactor);
      const tiltY = (pctX * tiltFactor);

      // Set transition to a fast, spring-like easing for lag-free premium cursor tracking
      tiltCard.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease';
      
      // Apply 3D rotation and premium scale lift (match React hoverScale of 1.07)
      tiltCard.style.transform = `scale(1.07) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // Map glare circle coordinates (0 to 100) following cursor
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      tiltGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 75%)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      // Re-enable smooth transition easing for luxury centering return animation
      tiltCard.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease';
      // Reset smooth perspective coordinates to dead center
      tiltCard.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
      tiltGlare.style.background = '';
    });
  }

  // 7. About Me Cards Radial Hover Glow tracking
  const aboutCards = document.querySelectorAll('.about-card');
  aboutCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // ==========================================================================
  // 8. MY SKILLS CATEGORY SELECTORS & IFRAME COORDINATION
  // ==========================================================================
  const skillCategories = document.querySelectorAll('.skills-category');
  
  skillCategories.forEach(cat => {
    cat.addEventListener('click', () => {
      // 1. Switch active state classes
      skillCategories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      
      // 2. Synchronize kinetic words and titles inside the terminal iframe
      const iframe = document.querySelector('.kinetic-iframe');
      if (iframe && iframe.contentWindow) {
        try {
          const id = cat.id;
          let categoryWords = [];
          let line1Text = "KINETIC";
          let line2Text = "ENGINE";
          
          if (id === 'cat-programming') {
            categoryWords = ["Python", "JavaScript", "C / C++", "Algorithms", "Data Structures", "Logic", "Compilation", "System Archs"];
            line1Text = "CODE";
            line2Text = "LOGIC";
          } else if (id === 'cat-webdev') {
            categoryWords = ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Flexbox", "Responsive", "Vercel"];
            line1Text = "WEB";
            line2Text = "STACKS";
          } else if (id === 'cat-datasci') {
            categoryWords = ["Data Analysis", "NumPy", "Pandas", "Matplotlib", "Statistics", "Plotting", "DataFrames"];
            line1Text = "DATA";
            line2Text = "SCIENCE";
          } else if (id === 'cat-aitools') {
            categoryWords = ["PyTorch", "Deep Learning", "OpenCV", "Neural Networks", "Hardware", "Arduino", "ESP32"];
            line1Text = "AI &";
            line2Text = "SYSTEMS";
          } else if (id === 'cat-content') {
            categoryWords = ["YouTube", "Premiere Pro", "Figma", "UI Design", "Visual Arts", "Storyboards", "Thumbnails"];
            line1Text = "CREATOR";
            line2Text = "STUDIO";
          }
          
          // Connect to iframe variables and trigger re-render
          const iframeWin = iframe.contentWindow;
          if (iframeWin.words) {
            iframeWin.words = categoryWords;
            
            // Update UI typography inside iframe
            if (iframeWin.document.getElementById('line1')) {
              iframeWin.document.getElementById('line1').textContent = line1Text;
            }
            if (iframeWin.document.getElementById('line2')) {
              iframeWin.document.getElementById('line2').textContent = line2Text;
            }
            
            // Sync customizer panels
            const inputW = iframeWin.document.getElementById('input-words');
            if (inputW) {
              inputW.value = categoryWords.join(', ');
            }
            
            const inputL1 = iframeWin.document.getElementById('input-line1');
            const inputL2 = iframeWin.document.getElementById('input-line2');
            if (inputL1) inputL1.value = line1Text;
            if (inputL2) inputL2.value = line2Text;

            // Trigger fanning reposition and play loops
            if (typeof iframeWin.renderTicker === 'function') {
              iframeWin.renderTicker();
            }
            if (typeof iframeWin.restartAutoPlayDirect === 'function') {
              iframeWin.restartAutoPlayDirect();
            }
            if (typeof iframeWin.showToast === 'function') {
              iframeWin.showToast(`Active Category: ${line1Text}`);
            }
          }
        } catch (e) {
          console.warn("Same-origin security prevents direct iframe coordination. Standard backup applied:", e);
        }
      }
    });
  });

  // 9. Coordinate Projects and Blogs Iframes Auto-Resizing & Scroll Locks
  const projectsIframe = document.getElementById('projectsIframe');
  const blogsIframe = document.getElementById('blogsIframe');
  
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    
    // Auto-resize the projects showcase frame to prevent double scrollbars
    if (e.data.type === 'resize-projects-iframe' && projectsIframe) {
      projectsIframe.style.height = `${e.data.height}px`;
    }
    
    // Auto-resize the blogs showcase frame to prevent double scrollbars
    if (e.data.type === 'resize-blogs-iframe' && blogsIframe) {
      blogsIframe.style.height = `${e.data.height}px`;
    }
    
    // Lock page scroll when details drawer overlay is active
    if (e.data.type === 'lock-scroll') {
      const activeIframe = e.data.source === 'blogs' ? blogsIframe : projectsIframe;
      if (e.data.lock) {
        document.body.style.overflow = 'hidden';
        if (activeIframe) {
          activeIframe.classList.add('fullscreen-drawer');
        }
      } else {
        document.body.style.overflow = '';
        if (activeIframe) {
          activeIframe.classList.remove('fullscreen-drawer');
        }
      }
    }
  });

  // ==========================================================================
  // 10. CONTACT FORM DYNAMIC INTERACTS (GLOW, SUCCESS TIMEOUTS, SCROLL REVEAL)
  // ==========================================================================
  const contactFormCard = document.querySelector('.contact-form-card');
  const formGlow = document.getElementById('formGlow');

  if (contactFormCard && formGlow) {
    contactFormCard.addEventListener('mousemove', (e) => {
      const rect = contactFormCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      contactFormCard.style.setProperty('--x', `${x}px`);
      contactFormCard.style.setProperty('--y', `${y}px`);
    });
  }

  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload
      
      const originalText = submitBtn.querySelector('span').textContent;
      
      // 1. Disable submit and trigger loading states
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.85';
      submitBtn.querySelector('span').textContent = 'Sending...';
      
      // 2. Fetch input values
      const nameVal = document.getElementById('form-name').value;
      const emailVal = document.getElementById('form-email').value;
      const subjectVal = document.getElementById('form-subject').value;
      const messageVal = document.getElementById('form-message').value;

      // 3. Submit form values via AJAX to FormSubmit
      fetch('https://formsubmit.co/ajax/aadil2githubb@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: nameVal,
          Email: emailVal,
          Subject: subjectVal,
          Message: messageVal
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Success feedback animation
        submitBtn.style.background = '#27C93F'; // Success green
        submitBtn.style.color = '#FFFFFF';
        submitBtn.querySelector('span').textContent = 'Message Sent ✓';
        
        // Hide icon temporarily
        const btnIcon = submitBtn.querySelector('.submit-btn-icon');
        if (btnIcon) btnIcon.style.display = 'none';
        
        // Clear form fields
        contactForm.reset();
        
        // Reset button back to default styles after 3s timeout
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.querySelector('span').textContent = originalText;
          if (btnIcon) btnIcon.style.display = '';
        }, 3000);
      })
      .catch(error => {
        console.error('Submission error:', error);
        
        // Error feedback animation
        submitBtn.style.background = '#FF3B30'; // Error red
        submitBtn.style.color = '#FFFFFF';
        submitBtn.querySelector('span').textContent = 'Error Sending!';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.querySelector('span').textContent = originalText;
        }, 3000);
      });
    });
  }

  // Intersection Observer for Premium Scroll Reveals
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      // Set initial styles
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      
      revealObserver.observe(el);
    });
  }

  // ==========================================================================
  // 11. ABOUT ME & ACADEMIC TAB SWITCHER LOGIC
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.about-tabs .tab-btn');
  const aboutMePanel = document.getElementById('about-me-panel');
  const academicPanel = document.getElementById('academic-panel');
  const aboutMeRightPanel = document.getElementById('about-me-right-panel');
  const aboutContainer = document.getElementById('aboutContainer');

  if (tabBtns.length > 0 && aboutMePanel && academicPanel && aboutContainer) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        // 1. Remove active states
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // 2. Add active to clicked
        btn.classList.add('active');
        
        // 3. Switch active panels with premium crossfade and container reflow
        const targetTab = btn.getAttribute('data-tab');
        
        if (targetTab === 'about-me') {
          academicPanel.style.opacity = '0';
          academicPanel.style.transform = 'translateY(8px)';
          
          if (aboutMeRightPanel) {
            aboutMeRightPanel.style.opacity = '0';
            aboutMeRightPanel.style.transform = 'translateY(8px)';
          }
          
          setTimeout(() => {
            academicPanel.style.display = 'none';
            aboutMePanel.style.display = 'flex';
            
            // Remove full-width class to reflow columns
            aboutContainer.classList.remove('academic-mode');
            
            if (aboutMeRightPanel) {
              aboutMeRightPanel.style.display = 'flex';
            }
            
            // Force reflow
            aboutMePanel.offsetHeight;
            if (aboutMeRightPanel) aboutMeRightPanel.offsetHeight;
            
            aboutMePanel.style.opacity = '1';
            aboutMePanel.style.transform = 'translateY(0)';
            
            if (aboutMeRightPanel) {
              aboutMeRightPanel.style.opacity = '1';
              aboutMeRightPanel.style.transform = 'translateY(0)';
            }
          }, 150);
        } else {
          aboutMePanel.style.opacity = '0';
          aboutMePanel.style.transform = 'translateY(8px)';
          
          if (aboutMeRightPanel) {
            aboutMeRightPanel.style.opacity = '0';
            aboutMeRightPanel.style.transform = 'translateY(8px)';
          }
          
          setTimeout(() => {
            aboutMePanel.style.display = 'none';
            if (aboutMeRightPanel) {
              aboutMeRightPanel.style.display = 'none';
            }
            
            // Add full-width class to hide right col and expand left col
            aboutContainer.classList.add('academic-mode');
            
            academicPanel.style.display = 'flex';
            
            // Force reflow
            academicPanel.offsetHeight;
            
            academicPanel.style.opacity = '1';
            academicPanel.style.transform = 'translateY(0)';
          }, 150);
        }
      });
    });
  }

  // ==========================================================================
  // 12. ACADEMIC CARDS RADIAL HOVER GLOW
  // ==========================================================================
  const academicCards = document.querySelectorAll('.academic-card');
  academicCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });



  // ==========================================================================
  // 16. FLOATING STICKY MENU INTERACTIVITY
  // ==========================================================================
  const stickyMenuWrapper = document.getElementById('stickyMenuWrapper');
  const stickyMenuTrigger = document.getElementById('stickyMenuTrigger');
  const stickyMenuDropdown = document.getElementById('stickyMenuDropdown');
  const stickyMenuClose = document.getElementById('stickyMenuClose');
  const stickyDropdownLinks = document.querySelectorAll('.sticky-dropdown-link');

  if (stickyMenuTrigger && stickyMenuDropdown) {
    // Open dropdown on trigger click
    stickyMenuTrigger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate document click trigger
      stickyMenuDropdown.classList.add('active');
    });

    // Close dropdown on close header click
    if (stickyMenuClose) {
      stickyMenuClose.addEventListener('click', (e) => {
        e.stopPropagation();
        stickyMenuDropdown.classList.remove('active');
      });
    }

    // Close dropdown when clicking a link
    stickyDropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        stickyMenuDropdown.classList.remove('active');
      });
    });

    // Close dropdown when clicking anywhere outside the menu wrapper
    document.addEventListener('click', (e) => {
      if (stickyMenuWrapper && !stickyMenuWrapper.contains(e.target)) {
        stickyMenuDropdown.classList.remove('active');
      }
    });

  // Synchronize active state with current scroll section for sticky and header links
  const activeSections = new Set();
  const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      
      if (entry.isIntersecting) {
        activeSections.add(id);
      } else {
        activeSections.delete(id);
      }
    });

    if (activeSections.size > 0) {
      let activeId = null;
      let minDistanceToCenter = Infinity;
      const viewportCenter = window.innerHeight / 2;
      
      activeSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            activeId = id;
            minDistanceToCenter = 0;
          } else if (minDistanceToCenter !== 0) {
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);
            if (distance < minDistanceToCenter) {
              minDistanceToCenter = distance;
              activeId = id;
            }
          }
        }
      });

      if (activeId) {
        // Sync sticky dropdown links
        stickyDropdownLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Sync header nav links
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }
  }, {
    root: null,
    threshold: 0,
    rootMargin: '0px'
  });

  // Observe each main section on the page
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    stickyObserver.observe(sec);
  });
  }

  // ==========================================================================
  // 17. HORIZONTAL IMAGE ACCORDION & INTEGRATION GUIDE COLLAPSIBLE
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        accordionItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // Collapsible Integration Guide Card
  const guideCard = document.getElementById('integrationGuideCard');
  const guideHeader = document.getElementById('guideHeader');
  if (guideCard && guideHeader) {
    guideHeader.addEventListener('click', () => {
      guideCard.classList.toggle('open');
    });
  }

  // ==========================================================================
  // 18. BUBBLE TEXT NAME ANIMATION
  // ==========================================================================
  const bubbleName = document.getElementById('bubble-name');
  if (bubbleName) {
    const text = bubbleName.textContent.trim();
    bubbleName.innerHTML = '';
    
    // Create span for each character
    const spans = text.split('').map((char, idx) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'bubble-char';
      span.dataset.idx = idx;
      bubbleName.appendChild(span);
      return span;
    });

    const updateBubbleStyles = (hoveredIdx) => {
      if (hoveredIdx === null) {
        bubbleName.classList.remove('bubble-hovering');
        spans.forEach(span => {
          span.className = 'bubble-char';
        });
      } else {
        bubbleName.classList.add('bubble-hovering');
        spans.forEach((span, idx) => {
          const distance = Math.abs(hoveredIdx - idx);
          if (distance === 0) {
            span.className = 'bubble-char dist-0';
          } else if (distance === 1) {
            span.className = 'bubble-char dist-1';
          } else if (distance === 2) {
            span.className = 'bubble-char dist-2';
          } else {
            span.className = 'bubble-char';
          }
        });
      }
    };

    spans.forEach(span => {
      span.addEventListener('mouseenter', () => {
        const idx = parseInt(span.dataset.idx);
        updateBubbleStyles(idx);
      });
    });

    bubbleName.addEventListener('mouseleave', () => {
      updateBubbleStyles(null);
    });
  }

  // ==========================================================================
  // 16. ACADEMIC MODAL LOGIC
  // ==========================================================================
  const btnAcademicModal = document.getElementById('btnAcademicModal');
  const academicModal = document.getElementById('academicModal');
  const btnCloseAcademicModal = document.getElementById('btnCloseAcademicModal');

  if (btnAcademicModal && academicModal && btnCloseAcademicModal) {
    btnAcademicModal.addEventListener('click', () => {
      academicModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    const closeModal = () => {
      academicModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    btnCloseAcademicModal.addEventListener('click', closeModal);

    // Close when clicking overlay background
    academicModal.addEventListener('click', (e) => {
      if (e.target === academicModal) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && academicModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // 17. PROJECTS SCROLL LOGIC
  // ==========================================================================
  const btnGoToProjects = document.getElementById('btnGoToProjects');
  if (btnGoToProjects) {
    btnGoToProjects.addEventListener('click', () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // 18. YOUTUBE CREATOR MODAL LOGIC
  // ==========================================================================
  const btnCreatorModal = document.getElementById('btnCreatorModal');
  const creatorModal = document.getElementById('creatorModal');
  const btnCloseCreatorModal = document.getElementById('btnCloseCreatorModal');

  if (btnCreatorModal && creatorModal && btnCloseCreatorModal) {
    btnCreatorModal.addEventListener('click', () => {
      creatorModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    const closeCreatorModal = () => {
      creatorModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    btnCloseCreatorModal.addEventListener('click', closeCreatorModal);

    // Close when clicking overlay background
    creatorModal.addEventListener('click', (e) => {
      if (e.target === creatorModal) {
        closeCreatorModal();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && creatorModal.classList.contains('active')) {
        closeCreatorModal();
      }
    });
  }

  // ==========================================================================
  // 19. EMAIL POPOVER & COPY TO CLIPBOARD LOGIC
  // ==========================================================================
  const emailPopoverWrapper = document.getElementById('emailPopoverWrapper');
  const btnEmailPopover = document.getElementById('btnEmailPopover');
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const copySuccessTooltip = document.getElementById('copySuccessTooltip');

  if (btnEmailPopover && emailPopoverWrapper && btnCopyEmail && copySuccessTooltip) {
    btnEmailPopover.addEventListener('click', (e) => {
      e.stopPropagation();
      emailPopoverWrapper.classList.toggle('active');
    });

    btnCopyEmail.addEventListener('click', (e) => {
      e.stopPropagation();
      const email = 'aadil2githubb@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        // Show success tooltip
        copySuccessTooltip.classList.add('show');
        setTimeout(() => {
          copySuccessTooltip.classList.remove('show');
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });

    // Close popover when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
      if (!emailPopoverWrapper.contains(e.target)) {
        emailPopoverWrapper.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 20. FOOTER LIVE LOCAL TIME (IST) CLOCK
  // ==========================================================================
  const updateFooterTime = () => {
    const footerTimeEl = document.getElementById('footer-local-time');
    if (!footerTimeEl) return;
    
    const timeString = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    footerTimeEl.textContent = `${timeString}, GMT +5:30`;
  };
  setInterval(updateFooterTime, 1000);
  updateFooterTime();

});



