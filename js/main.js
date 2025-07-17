// Enhanced Real Estate Website JavaScript with Comprehensive Animations

document.addEventListener("DOMContentLoaded", () => {
  // Initialize animation system
  initializeAnimations()

  // Navbar scroll effect with enhanced animations
  const navbar = document.querySelector(".custom-navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const bootstrap = window.bootstrap

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Enhanced smooth scrolling with animation callbacks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Add loading animation to clicked link
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 150)

        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Trigger section animations after scroll
        setTimeout(() => {
          triggerSectionAnimations(targetSection)
        }, 800)
      }

      // Update active nav link with animation
      navLinks.forEach((nav) => {
        nav.classList.remove("active")
        nav.style.transform = "scale(1)"
      })
      this.classList.add("active")
      this.style.transform = "scale(1.05)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Enhanced scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")

        // Special handling for stat counters
        if (entry.target.classList.contains("stat-item")) {
          animateCounter(entry.target)
        }

        animationObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Initialize scroll animations
  function initializeAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = [
      { selector: ".highlight-card", class: "animate-on-scroll" },
      { selector: ".price-card", class: "animate-scale-up" },
      { selector: ".amenity-card", class: "animate-on-scroll" },
      { selector: ".gallery-item", class: "animate-scale-up" },
      { selector: ".location-item", class: "animate-slide-left" },
      { selector: ".achievement-item", class: "animate-slide-right" },
      { selector: ".contact-item", class: "animate-slide-left" },
      { selector: ".footer-widget", class: "animate-on-scroll" },
      { selector: ".section-title", class: "animate-fade-in" },
      { selector: ".about-content", class: "animate-slide-left" },
      { selector: ".about-image", class: "animate-slide-right" },
      { selector: ".contact-form", class: "animate-scale-up" },
      { selector: ".builder-image", class: "animate-on-scroll" },
    ]

    elementsToAnimate.forEach(({ selector, class: animationClass }) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        element.classList.add(animationClass)
        animationObserver.observe(element)
      })
    })

    // Add stagger animation to containers
    const staggerContainers = [
      ".stats-row",
      ".row .col-lg-4", // For amenities and highlights
      ".gallery-grid",
    ]

    staggerContainers.forEach((selector) => {
      const containers = document.querySelectorAll(selector)
      containers.forEach((container) => {
        container.classList.add("stagger-animation")
        animationObserver.observe(container)
      })
    })
  }

  // Enhanced section title animation
  function animateSectionTitle(element) {
    element.style.transform = "translateY(0)"
    element.style.opacity = "1"

    // Animate underline
    setTimeout(() => {
      element.classList.add("animated")
    }, 300)
  }

  // Enhanced counter animation
  function animateCounter(element) {
    const numberElement = element.querySelector("h3")
    if (!numberElement) return

    const finalNumber = Number.parseInt(numberElement.textContent)
    let currentNumber = 0
    const increment = finalNumber / 60
    const suffix = "+"

    const countAnimation = () => {
      currentNumber += increment
      if (currentNumber >= finalNumber) {
        numberElement.textContent = finalNumber + suffix
        return
      }
      numberElement.textContent = Math.floor(currentNumber) + suffix
      requestAnimationFrame(countAnimation)
    }

    setTimeout(() => {
      countAnimation()
    }, 500)
  }

  // Enhanced gallery filter with animations
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Animate button press
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Animate gallery items
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, index * 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Enhanced gallery lightbox with animations
  const galleryCards = document.querySelectorAll(".gallery-card")

  galleryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector("img")
      const imgSrc = img.getAttribute("src")
      const imgAlt = img.getAttribute("alt")

      // Create animated lightbox modal
      const lightbox = document.createElement("div")
      lightbox.className = "lightbox-modal"
      lightbox.style.opacity = "0"
      lightbox.innerHTML = `
        <div class="lightbox-content" style="transform: scale(0.5) rotateY(90deg); opacity: 0;">
          <span class="lightbox-close">&times;</span>
          <img src="${imgSrc}" alt="${imgAlt}" class="lightbox-image">
          <div class="lightbox-caption">${imgAlt}</div>
        </div>
      `

      document.body.appendChild(lightbox)
      document.body.style.overflow = "hidden"

      // Animate lightbox in
      setTimeout(() => {
        lightbox.style.opacity = "1"
        const content = lightbox.querySelector(".lightbox-content")
        content.style.transform = "scale(1) rotateY(0deg)"
        content.style.opacity = "1"
      }, 50)

      // Close lightbox with animation
      const closeBtn = lightbox.querySelector(".lightbox-close")
      closeBtn.addEventListener("click", closeLightbox)
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox()
        }
      })

      function closeLightbox() {
        const content = lightbox.querySelector(".lightbox-content")
        content.style.transform = "scale(0.5) rotateY(-90deg)"
        content.style.opacity = "0"
        lightbox.style.opacity = "0"

        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox)
          }
          document.body.style.overflow = "auto"
        }, 300)
      }
    })
  })

  // Enhanced contact form with animations
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Animate button
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.style.transform = "scale(0.95)"
    submitBtn.disabled = true

    // Animate form inputs
    const inputs = this.querySelectorAll(".form-control")
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.style.transform = "scale(0.98)"
        setTimeout(() => {
          input.style.transform = "scale(1)"
        }, 100)
      }, index * 50)
    })

    // Simulate form processing
    setTimeout(() => {
      submitBtn.style.transform = "scale(1)"
      showNotification("Thank you for your inquiry! We will contact you soon.", "success")

      // Reset form
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })

  // Enhanced back to top button
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    // Animate button press
    backToTopBtn.style.transform = "scale(0.8) rotateZ(180deg)"
    setTimeout(() => {
      backToTopBtn.style.transform = "scale(1) rotateZ(0deg)"
    }, 200)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Enhanced form field focus animations
  const formInputs = document.querySelectorAll(".form-control")

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateField(this)
      }
    })
  })

  // Enhanced button hover animations
  const buttonElements = document.querySelectorAll(".btn")

  buttonElements.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })
  })

  // Enhanced price card animations
  const priceCardElements = document.querySelectorAll(".price-card")

  priceCardElements.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Subtle scale effect for other cards
      priceCardElements.forEach((otherCard) => {
        if (otherCard !== this) {
          otherCard.style.opacity = "0.8"
          otherCard.style.transform = "scale(0.98)"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      // Reset all cards
      priceCardElements.forEach((otherCard) => {
        otherCard.style.opacity = "1"
        if (otherCard.classList.contains("featured")) {
          otherCard.style.transform = "scale(1.05)"
        } else {
          otherCard.style.transform = "scale(1)"
        }
      })
    })
  })

  // Enhanced tab animations
  const tabButtonElements = document.querySelectorAll('[data-bs-toggle="pill"]')

  tabButtonElements.forEach((button) => {
    button.addEventListener("click", function () {
      // Animate tab button
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Enhanced newsletter subscription
  const newsletterFormElement = document.querySelector(".newsletter-form")

  if (newsletterFormElement) {
    const newsletterInput = newsletterFormElement.querySelector('input[type="email"]')
    const newsletterBtn = newsletterFormElement.querySelector("button")

    newsletterFormElement.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterInput.value

      if (email) {
        // Animate subscription
        newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        newsletterBtn.style.transform = "scale(0.95)"

        setTimeout(() => {
          newsletterBtn.style.transform = "scale(1)"
          showNotification("Thank you for subscribing to our newsletter!", "success")

          // Clear input with animation
          newsletterInput.style.transform = "scale(0.95)"
          setTimeout(() => {
            newsletterInput.value = ""
            newsletterInput.style.transform = "scale(1)"
          }, 200)

          newsletterBtn.innerHTML = "Subscribe"
        }, 1500)
      }
    })
  }

  // Enhanced social media hover effects
  const socialLinks = document.querySelectorAll(".social-links a")

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) rotateZ(360deg) scale(1.2)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateZ(0deg) scale(1)"
    })
  })

  // Parallax effect for hero section
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero-section")

    if (heroSection) {
      const rate = scrolled * -0.3
      heroSection.style.transform = `translateY(${rate}px)`
    }

    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })

  // Enhanced active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      link.style.transform = "scale(1)"

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
        link.style.transform = "scale(1.05)"
      }
    })
  })

  // Utility functions
  function validateField(field) {
    const value = field.value.trim()
    let isValid = true
    let errorMessage = ""

    if (field.hasAttribute("required") && !value) {
      isValid = false
      errorMessage = "This field is required"
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        isValid = false
        errorMessage = "Please enter a valid email address"
      }
    }

    if (field.type === "tel" && value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(value.replace(/\s/g, ""))) {
        isValid = false
        errorMessage = "Please enter a valid phone number"
      }
    }

    if (isValid) {
      field.classList.remove("is-invalid")
      field.classList.add("is-valid")
      removeErrorMessage(field)
    } else {
      field.classList.remove("is-valid")
      field.classList.add("is-invalid")
      showErrorMessage(field, errorMessage)
    }

    return isValid
  }

  function showErrorMessage(field, message) {
    removeErrorMessage(field)
    const errorDiv = document.createElement("div")
    errorDiv.className = "invalid-feedback"
    errorDiv.textContent = message
    errorDiv.style.opacity = "0"
    errorDiv.style.transform = "translateY(-10px)"
    field.parentNode.appendChild(errorDiv)

    setTimeout(() => {
      errorDiv.style.opacity = "1"
      errorDiv.style.transform = "translateY(0)"
    }, 100)
  }

  function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector(".invalid-feedback")
    if (existingError) {
      existingError.style.opacity = "0"
      existingError.style.transform = "translateY(-10px)"
      setTimeout(() => {
        existingError.remove()
      }, 200)
    }
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.transform = "translateX(400px)"
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `

    document.body.appendChild(notification)

    // Animate notification in
    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = "translateX(400px)"
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }
    }, 5000)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    })
  }

  function triggerSectionAnimations(section) {
    const animatedElements = section.querySelectorAll(
      ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-up",
    )

    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animated")
      }, index * 100)
    })
  }

  // Initialize page load animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".hero-content > *")
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 500)

  // Performance optimization for animations
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Recalculate animations on resize
      initializeAnimations()
    }, 250)
  })
})

// Hero Slider Functionality
let currentSlideIndex = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
let slideInterval
let isAutoPlaying = true

// Initialize slider
function initSlider() {
  showSlide(currentSlideIndex)
  startAutoSlide()

  // Add touch/swipe support for mobile
  addTouchSupport()
}

// Show specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "fade-in", "fade-out")
    if (i === index) {
      slide.classList.add("active", "fade-in")
    }
  })

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.remove("active", "auto-playing")
    if (i === index) {
      dot.classList.add("active")
      if (isAutoPlaying) {
        dot.classList.add("auto-playing")
      }
    }
  })

  currentSlideIndex = index
}

// Change slide function
function changeSlide(direction) {
  stopAutoSlide()

  const newIndex = currentSlideIndex + direction

  if (newIndex >= slides.length) {
    currentSlideIndex = 0
  } else if (newIndex < 0) {
    currentSlideIndex = slides.length - 1
  } else {
    currentSlideIndex = newIndex
  }

  showSlide(currentSlideIndex)

  // Restart auto-slide after manual navigation
  setTimeout(() => {
    startAutoSlide()
  }, 3000)
}

// Go to specific slide
function currentSlide(index) {
  stopAutoSlide()
  showSlide(index - 1)

  // Restart auto-slide after manual navigation
  setTimeout(() => {
    startAutoSlide()
  }, 3000)
}

// Auto-slide functionality
function startAutoSlide() {
  isAutoPlaying = true
  slideInterval = setInterval(() => {
    const nextIndex = (currentSlideIndex + 1) % slides.length
    showSlide(nextIndex)
  }, 4000) // Change slide every 4 seconds
}

function stopAutoSlide() {
  isAutoPlaying = false
  clearInterval(slideInterval)

  // Remove auto-playing indicator from all dots
  dots.forEach((dot) => {
    dot.classList.remove("auto-playing")
  })
}

// Pause auto-slide on hover
function addHoverControls() {
  const heroSection = document.querySelector(".hero-section")

  heroSection.addEventListener("mouseenter", () => {
    stopAutoSlide()
  })

  heroSection.addEventListener("mouseleave", () => {
    startAutoSlide()
  })
}

// Touch/Swipe support for mobile
function addTouchSupport() {
  const heroSection = document.querySelector(".hero-section")
  let startX = 0
  let endX = 0

  heroSection.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
  })

  heroSection.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        changeSlide(1)
      } else {
        // Swipe right - previous slide
        changeSlide(-1)
      }
    }
  }
}

// Keyboard navigation
function addKeyboardControls() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      changeSlide(-1)
    } else if (e.key === "ArrowRight") {
      changeSlide(1)
    } else if (e.key >= "1" && e.key <= "4") {
      currentSlide(Number.parseInt(e.key))
    }
  })
}

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    "/placeholder.svg?height=800&width=1920&text=Luxury+Villa+Exterior",
    "/placeholder.svg?height=800&width=1920&text=Modern+Living+Room",
    "/placeholder.svg?height=800&width=1920&text=Beautiful+Garden+View",
    "/placeholder.svg?height=800&width=1920&text=Swimming+Pool+Area",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Enhanced slider with progress indicator
function addProgressIndicator() {
  const heroSection = document.querySelector(".hero-section")
  const progressContainer = document.createElement("div")
  progressContainer.className = "slider-progress"

  const progressBar = document.createElement("div")
  progressBar.className = "slider-progress-bar"

  progressContainer.appendChild(progressBar)
  heroSection.appendChild(progressContainer)

  // Update progress bar
  function updateProgress() {
    const progress = ((currentSlideIndex + 1) / slides.length) * 100
    progressBar.style.width = progress + "%"
  }

  // Update progress when slide changes
  const originalShowSlide = showSlide
  showSlide = (index) => {
    originalShowSlide(index)
    updateProgress()
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animation system
  initializeAnimations()

  // Navbar scroll effect with enhanced animations
  const navbar = document.querySelector(".custom-navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const bootstrap = window.bootstrap

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Enhanced smooth scrolling with animation callbacks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Add loading animation to clicked link
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 150)

        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Trigger section animations after scroll
        setTimeout(() => {
          triggerSectionAnimations(targetSection)
        }, 800)
      }

      // Update active nav link with animation
      navLinks.forEach((nav) => {
        nav.classList.remove("active")
        nav.style.transform = "scale(1)"
      })
      this.classList.add("active")
      this.style.transform = "scale(1.05)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Enhanced scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")

        // Special handling for stat counters
        if (entry.target.classList.contains("stat-item")) {
          animateCounter(entry.target)
        }

        animationObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Initialize scroll animations
  function initializeAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = [
      { selector: ".highlight-card", class: "animate-on-scroll" },
      { selector: ".price-card", class: "animate-scale-up" },
      { selector: ".amenity-card", class: "animate-on-scroll" },
      { selector: ".gallery-item", class: "animate-scale-up" },
      { selector: ".location-item", class: "animate-slide-left" },
      { selector: ".achievement-item", class: "animate-slide-right" },
      { selector: ".contact-item", class: "animate-slide-left" },
      { selector: ".footer-widget", class: "animate-on-scroll" },
      { selector: ".section-title", class: "animate-fade-in" },
      { selector: ".about-content", class: "animate-slide-left" },
      { selector: ".about-image", class: "animate-slide-right" },
      { selector: ".contact-form", class: "animate-scale-up" },
      { selector: ".builder-image", class: "animate-on-scroll" },
    ]

    elementsToAnimate.forEach(({ selector, class: animationClass }) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        element.classList.add(animationClass)
        animationObserver.observe(element)
      })
    })

    // Add stagger animation to containers
    const staggerContainers = [
      ".stats-row",
      ".row .col-lg-4", // For amenities and highlights
      ".gallery-grid",
    ]

    staggerContainers.forEach((selector) => {
      const containers = document.querySelectorAll(selector)
      containers.forEach((container) => {
        container.classList.add("stagger-animation")
        animationObserver.observe(container)
      })
    })
  }

  // Enhanced section title animation
  function animateSectionTitle(element) {
    element.style.transform = "translateY(0)"
    element.style.opacity = "1"

    // Animate underline
    setTimeout(() => {
      element.classList.add("animated")
    }, 300)
  }

  // Enhanced counter animation
  function animateCounter(element) {
    const numberElement = element.querySelector("h3")
    if (!numberElement) return

    const finalNumber = Number.parseInt(numberElement.textContent)
    let currentNumber = 0
    const increment = finalNumber / 60
    const suffix = "+"

    const countAnimation = () => {
      currentNumber += increment
      if (currentNumber >= finalNumber) {
        numberElement.textContent = finalNumber + suffix
        return
      }
      numberElement.textContent = Math.floor(currentNumber) + suffix
      requestAnimationFrame(countAnimation)
    }

    setTimeout(() => {
      countAnimation()
    }, 500)
  }

  // Enhanced gallery filter with animations
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Animate button press
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Update active filter button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Animate gallery items
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Enhanced gallery lightbox with animations
  const galleryCards = document.querySelectorAll(".gallery-card")

  galleryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector("img")
      const imgSrc = img.getAttribute("src")
      const imgAlt = img.getAttribute("alt")

      // Create animated lightbox modal
      const lightbox = document.createElement("div")
      lightbox.className = "lightbox-modal"
      lightbox.style.opacity = "0"
      lightbox.innerHTML = `
        <div class="lightbox-content" style="transform: scale(0.5) rotateY(90deg); opacity: 0;">
          <span class="lightbox-close">&times;</span>
          <img src="${imgSrc}" alt="${imgAlt}" class="lightbox-image">
          <div class="lightbox-caption">${imgAlt}</div>
        </div>
      `

      document.body.appendChild(lightbox)
      document.body.style.overflow = "hidden"

      // Animate lightbox in
      setTimeout(() => {
        lightbox.style.opacity = "1"
        const content = lightbox.querySelector(".lightbox-content")
        content.style.transform = "scale(1) rotateY(0deg)"
        content.style.opacity = "1"
      }, 50)

      // Close lightbox with animation
      const closeBtn = lightbox.querySelector(".lightbox-close")
      closeBtn.addEventListener("click", closeLightbox)
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox()
        }
      })

      function closeLightbox() {
        const content = lightbox.querySelector(".lightbox-content")
        content.style.transform = "scale(0.5) rotateY(-90deg)"
        content.style.opacity = "0"
        lightbox.style.opacity = "0"

        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox)
          }
          document.body.style.overflow = "auto"
        }, 300)
      }
    })
  })

  // Enhanced contact form with animations
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Animate button
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.style.transform = "scale(0.95)"
    submitBtn.disabled = true

    // Animate form inputs
    const inputs = this.querySelectorAll(".form-control")
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.style.transform = "scale(0.98)"
        setTimeout(() => {
          input.style.transform = "scale(1)"
        }, 100)
      }, index * 50)
    })

    // Simulate form processing
    setTimeout(() => {
      submitBtn.style.transform = "scale(1)"
      showNotification("Thank you for your inquiry! We will contact you soon.", "success")

      // Reset form
      this.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })

  // Enhanced back to top button
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    // Animate button press
    backToTopBtn.style.transform = "scale(0.8) rotateZ(180deg)"
    setTimeout(() => {
      backToTopBtn.style.transform = "scale(1) rotateZ(0deg)"
    }, 200)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Enhanced form field focus animations
  const formInputs = document.querySelectorAll(".form-control")

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)"
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateField(this)
      }
    })
  })

  // Enhanced button hover animations
  const buttonElements = document.querySelectorAll(".btn")

  buttonElements.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })
  })

  // Enhanced price card animations
  const priceCardElements = document.querySelectorAll(".price-card")

  priceCardElements.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Subtle scale effect for other cards
      priceCardElements.forEach((otherCard) => {
        if (otherCard !== this) {
          otherCard.style.opacity = "0.8"
          otherCard.style.transform = "scale(0.98)"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      // Reset all cards
      priceCardElements.forEach((otherCard) => {
        otherCard.style.opacity = "1"
        if (otherCard.classList.contains("featured")) {
          otherCard.style.transform = "scale(1.05)"
        } else {
          otherCard.style.transform = "scale(1)"
        }
      })
    })
  })

  // Enhanced tab animations
  const tabButtonElements = document.querySelectorAll('[data-bs-toggle="pill"]')

  tabButtonElements.forEach((button) => {
    button.addEventListener("click", function () {
      // Animate tab button
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Enhanced newsletter subscription
  const newsletterFormElement = document.querySelector(".newsletter-form")

  if (newsletterFormElement) {
    const newsletterInput = newsletterFormElement.querySelector('input[type="email"]')
    const newsletterBtn = newsletterFormElement.querySelector("button")

    newsletterFormElement.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterInput.value

      if (email) {
        // Animate subscription
        newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        newsletterBtn.style.transform = "scale(0.95)"

        setTimeout(() => {
          newsletterBtn.style.transform = "scale(1)"
          showNotification("Thank you for subscribing to our newsletter!", "success")

          // Clear input with animation
          newsletterInput.style.transform = "scale(0.95)"
          setTimeout(() => {
            newsletterInput.value = ""
            newsletterInput.style.transform = "scale(1)"
          }, 200)

          newsletterBtn.innerHTML = "Subscribe"
        }, 1500)
      }
    })
  }

  // Enhanced social media hover effects
  const socialLinks = document.querySelectorAll(".social-links a")

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) rotateZ(360deg) scale(1.2)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateZ(0deg) scale(1)"
    })
  })

  // Parallax effect for hero section
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector(".hero-section")

    if (heroSection) {
      const rate = scrolled * -0.3
      heroSection.style.transform = `translateY(${rate}px)`
    }

    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })

  // Enhanced active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      link.style.transform = "scale(1)"

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
        link.style.transform = "scale(1.05)"
      }
    })
  })

  // Utility functions
  // function validateField(field) {
  //   const value = field.value.trim()
  //   let isValid = true
  //   let errorMessage = ""

  //   if (field.hasAttribute("required") && !value) {
  //     isValid = false
  //     errorMessage = "This field is required"
  //   }

  //   if (field.type === "email" && value) {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //     if (!emailRegex.test(value)) {
  //       isValid = false
  //       errorMessage = "Please enter a valid email address"
  //     }
  //   }

  //   if (field.type === "tel" && value) {
  //     const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  //     if (!phoneRegex.test(value.replace(/\s/g, ""))) {
  //       isValid = false
  //       errorMessage = "Please enter a valid phone number"
  //     }
  //   }

  //   if (isValid) {
  //     field.classList.remove("is-invalid")
  //     field.classList.add("is-valid")
  //     removeErrorMessage(field)
  //   } else {
  //     field.classList.remove("is-valid")
  //     field.classList.add("is-invalid")
  //     showErrorMessage(field, errorMessage)
  //   }

  //   return isValid
  // }

  function showErrorMessage(field, message) {
    removeErrorMessage(field)
    const errorDiv = document.createElement("div")
    errorDiv.className = "invalid-feedback"
    errorDiv.textContent = message
    errorDiv.style.opacity = "0"
    errorDiv.style.transform = "translateY(-10px)"
    field.parentNode.appendChild(errorDiv)

    setTimeout(() => {
      errorDiv.style.opacity = "1"
      errorDiv.style.transform = "translateY(0)"
    }, 100)
  }

  function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector(".invalid-feedback")
    if (existingError) {
      existingError.style.opacity = "0"
      existingError.style.transform = "translateY(-10px)"
      setTimeout(() => {
        existingError.remove()
      }, 200)
    }
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.transform = "translateX(400px)"
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `

    document.body.appendChild(notification)

    // Animate notification in
    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = "translateX(400px)"
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }
    }, 5000)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    })
  }

  function triggerSectionAnimations(section) {
    const animatedElements = section.querySelectorAll(
      ".animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-up",
    )

    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animated")
      }, index * 100)
    })
  }

  // Initialize page load animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll(".hero-content > *")
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 500)

  // Performance optimization for animations
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Recalculate animations on resize
      initializeAnimations()
    }, 250)
  })

  // Initialize slider
  if (slides.length > 0) {
    initSlider()
    addHoverControls()
    addKeyboardControls()
    preloadImages()
    addProgressIndicator()
  }
})

// Pause slider when page is not visible
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoSlide()
  } else {
    startAutoSlide()
  }
})

// Make functions global for onclick handlers
window.changeSlide = changeSlide
window.currentSlide = currentSlide












// pop up 

function openPopup() {
            document.getElementById('popupOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            document.getElementById('popupOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close popup when clicking outside
        document.getElementById('popupOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });

        function handleSubmit(event) {
            event.preventDefault();
            
            const submitBtn = event.target.querySelector('.popup-submit');
            const form = event.target;
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = `
                    <svg class="submit-icon icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Send Inquiry
                `;
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message show';
                successMsg.textContent = 'Thank you! We will contact you soon with property details.';
                form.appendChild(successMsg);
                
                // Reset form
                form.reset();
                
                // Close popup after 2 seconds
                setTimeout(() => {
                    closePopup();
                    successMsg.remove();
                }, 2000);
                
            }, 1500);
        }

        // floor plan


        