// 当前语言状态
let currentLang = 'en';

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', () => {

    // 0. 动态渲染数据
    renderData(currentLang);

    // 0.5 初始化炫酷特效（事件委托，只绑定一次，无需在 renderData 后重绑）
    initScrollProgress();
    initGridCanvas();
    initSectionTitleGlow();
    initTilt3D();

    // 语言切换按钮
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';
            document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
            renderData(currentLang);
        });
    }

    // 1. 滚动淡入动画 (Intersection Observer)
    initFadeUpObserver();

    // 2. 自定义鼠标光标 (仅在宽屏上显示)
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        bindCursorEvents();
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. 滚动切换背景图
    initScrollBackground();
});

// 绑定鼠标光标交互事件（事件委托，一次绑定，适配语言切换与动态内容）
let cursorEventsBound = false;
function bindCursorEvents() {
    if (cursorEventsBound) return;
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;
    cursorEventsBound = true;
    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, .gallery-item, .lang-toggle')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            cursor.style.border = 'none';
        }
    });
    document.body.addEventListener('mouseout', (e) => {
        const el = e.target.closest('a, .gallery-item, .lang-toggle');
        if (el && (!e.relatedTarget || !el.contains(e.relatedTarget))) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid rgba(255, 255, 255, 0.5)';
        }
    });
}

// 数据渲染函数
function renderData(lang) {
    if (typeof siteData === 'undefined') return;
    const d = siteData[lang];
    if (!d) return;

    // 渲染首屏
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer) {
        heroContainer.innerHTML = `
            <div class="hero-inner">
                <div class="hero-text">
                    <h1 class="title">${d.hero.title}</h1>
                    <p class="subtitle">${d.hero.greeting} <span>${d.hero.name}</span></p>
                    <p class="nickname">aka <span>${d.hero.nickname}</span></p>
                    <p class="description">${d.hero.description}</p>
                </div>
                <div class="hero-avatar">
                    <img src="${d.hero.avatar}" alt="${d.hero.name}">
                </div>
            </div>
        `;
    }

    // 渲染区块标题
    document.querySelectorAll('[data-section]').forEach(el => {
        const key = el.getAttribute('data-section');
        if (d.sectionTitles[key]) {
            el.textContent = d.sectionTitles[key];
        }
    });

    // 渲染教育背景
    const eduContainer = document.getElementById('education-container');
    if (eduContainer) {
        let eduHTML = `<p>${d.education.university}</p>`;
        d.education.items.forEach(item => {
            eduHTML += `
                <div class="education-item">
                    <span class="edu-degree">${item.degree}</span>
                    <span class="edu-time">${item.time}</span>
                    <div class="edu-desc">${item.desc}</div>
                </div>
            `;
        });
        eduContainer.innerHTML = eduHTML;
    }

    // 渲染专业技能（带交错动画）
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        d.skills.forEach((skill, i) => {
            const stagger = Math.min(i + 1, 8);
            skillsContainer.innerHTML += `
                <div class="skill-item fade-up stagger-${stagger}" data-stagger>
                    <div class="skill-title">${skill.title}</div>
                    <div class="skill-desc">${skill.desc}</div>
                </div>
            `;
        });
    }

    // 渲染核心经历 - 实习
    const expContainer = document.getElementById('experience-container');
    if (expContainer) {
        expContainer.innerHTML = '';
        d.experience.forEach(exp => {
            expContainer.innerHTML += `
                <div class="work-item">
                    <h3 class="work-title">${exp.title}</h3>
                    <div class="work-meta">${exp.meta}</div>
                    <p class="work-desc">${exp.desc}</p>
                </div>
            `;
        });
    }

    // 渲染核心经历 - 项目（带交错动画）
    const projContainer = document.getElementById('projects-container');
    if (projContainer) {
        projContainer.innerHTML = '';
        d.projects.forEach((proj, i) => {
            const stagger = Math.min(i + 1, 8);
            projContainer.innerHTML += `
                <div class="gallery-item fade-up stagger-${stagger}">
                    <div class="image-placeholder">
                        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                    </div>
                    <p class="project-name"><strong>${proj.title}（${proj.time}）</strong><br>${proj.desc}</p>
                </div>
            `;
        });
    }

    // 渲染论文与专利
    const pubContainer = document.getElementById('publications-container');
    if (pubContainer) {
        pubContainer.innerHTML = '';
        d.publications.forEach(pub => {
            pubContainer.innerHTML += `
                <li><span class="pub-tag">${pub.tag}</span> ${pub.content}</li>
            `;
        });
    }

    // 渲染联系方式
    const contactContainer = document.getElementById('contact-container');
    if (contactContainer) {
        contactContainer.innerHTML = `
            <a href="mailto:${d.contact.email}" class="link">${d.contact.emailText}</a>
            <a href="${d.contact.resume}" class="link" target="_blank">${d.contact.resumeText}</a>
            <a href="tel:${d.contact.phoneLink}" class="link">${d.contact.phone} ↗</a>
        `;
    }

    // 渲染底部版权
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `<p>&copy; ${new Date().getFullYear()} ${d.hero.name}. All rights reserved.</p>`;
    }

    // 加载博客列表
    loadBlogPosts();

    // 语言切换后：重新观察新创建的 fade-up 元素
    observeFadeUpElements();
}

// 博客列表加载函数
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    const posts = (typeof blogPosts !== 'undefined') ? blogPosts : [];

    if (!posts || posts.length === 0) {
        blogContainer.innerHTML = '<p class="text-muted">暂无文章</p>';
        return;
    }
    blogContainer.innerHTML = '';
    posts.forEach((post, i) => {
        const stagger = Math.min(i + 1, 8);
        const tags = Array.isArray(post.tags)
            ? post.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')
            : '';
        const updated = post.updated && post.updated !== post.created
            ? `<span class="blog-updated">Updated: ${post.updated}</span>`
            : '';
        blogContainer.innerHTML += `
            <a href="post.html?file=${encodeURIComponent(post.file)}" class="blog-card fade-up stagger-${stagger}" data-stagger>
                <div class="blog-card-header">
                    <h3 class="blog-card-title">${post.title}</h3>
                    <div class="blog-card-meta">
                        <span class="blog-date">${post.created}</span>
                        ${updated}
                    </div>
                </div>
                <div class="blog-card-tags">${tags}</div>
            </a>
        `;
    });
}

// 滚动淡入动画：Observer 与观察逻辑（语言切换后需重新观察新元素）
let fadeUpObserver = null;

function initFadeUpObserver() {
    if (fadeUpObserver) return; // 只创建一次
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, observerOptions);
    observeFadeUpElements();
}

function observeFadeUpElements() {
    if (!fadeUpObserver) return;
    const fadeElems = document.querySelectorAll('.fade-up');
    fadeElems.forEach(elem => {
        if (elem.closest('#hero')) {
            elem.classList.remove('visible'); // 先移除以触发重动画
            elem.offsetHeight; // 强制 reflow
            setTimeout(() => elem.classList.add('visible'), 50);
        } else {
            fadeUpObserver.observe(elem); // 持续观察，进出视口时切换 visible
        }
    });
}

// 滚动切换背景图
function initScrollBackground() {
    const landscapeImages = [
        'images/landscape/landscape_1.jpg',
        'images/landscape/landscape_2.jpg',
        'images/landscape/landscape_3.jpg',
        'images/landscape/landscape_4.jpg',
        'images/landscape/landscape_5.jpg',
        'images/landscape/landscape_6.jpg',
    ];

    // 预加载所有图片
    landscapeImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    const sections = document.querySelectorAll('#hero, .section');
    const layerA = document.getElementById('bg-layer-a');
    const layerB = document.getElementById('bg-layer-b');
    if (!layerA || !layerB) return;

    let activeLayer = 'a'; // 当前显示的图层
    let currentImageIndex = -1;

    // 初始化第一张背景
    layerA.style.backgroundImage = `url('${landscapeImages[0]}')`;
    layerA.classList.add('active');
    currentImageIndex = 0;

    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // 找到当前进入视口的 section 索引
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx === -1) return;

            // 将 section 索引映射到图片索引（循环使用）
            const imgIdx = idx % landscapeImages.length;
            if (imgIdx === currentImageIndex) return;

            currentImageIndex = imgIdx;
            const newUrl = `url('${landscapeImages[imgIdx]}')`;

            // 交替使用两个图层做交叉淡入淡出
            if (activeLayer === 'a') {
                layerB.style.backgroundImage = newUrl;
                layerB.classList.add('active');
                layerA.classList.remove('active');
                activeLayer = 'b';
            } else {
                layerA.style.backgroundImage = newUrl;
                layerA.classList.add('active');
                layerB.classList.remove('active');
                activeLayer = 'a';
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.35
    });

    sections.forEach(sec => bgObserver.observe(sec));
}

// ========== 炫酷特效 ==========

// 滚动进度条
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        progressBar.style.transform = `scaleX(${progress / 100})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// 网格粒子 Canvas 背景
function initGridCanvas() {
    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const gridSize = 60;
    const dotRadius = 0.8;
    let time = 0;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const draw = () => {
        time += 0.02;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
            for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
                const offsetX = Math.sin(time + x * 0.002) * 3;
                const offsetY = Math.cos(time * 0.8 + y * 0.002) * 3;
                const alpha = 0.15 + Math.sin(time + x * 0.01 + y * 0.01) * 0.08;
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, dotRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
                ctx.fill();
            }
        }
        animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();
}

// Section 标题进入视口时发光
function initSectionTitleGlow() {
    const titles = document.querySelectorAll('.section-title');
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('glow', entry.isIntersecting);
        });
    }, { threshold: 0.5 });

    titles.forEach(t => glowObserver.observe(t));
}

// 3D 倾斜卡片效果（事件委托，一次绑定，适配语言切换后的新 DOM）
function initTilt3D() {
    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.gallery-item');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    });
    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.gallery-item');
        if (card && !card.contains(e.relatedTarget)) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
    });
}