// 等待页面加载完成
document.addEventListener('DOMContentLoaded', () => {

    // 0. 动态渲染数据
    renderData();

    // 1. 滚动淡入动画 (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 元素露出 15% 时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 动画只触发一次
            }
        });
    }, observerOptions);

    const fadeElems = document.querySelectorAll('.fade-up');
    fadeElems.forEach(elem => {
        // 首屏元素延迟一点点触发动画，效果更好
        if(elem.closest('#hero')) {
            setTimeout(() => {
                elem.classList.add('visible');
            }, 100);
        } else {
            observer.observe(elem);
        }
    });

    // 2. 自定义鼠标光标 (仅在宽屏上显示)
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // 重新获取由于 DOM 动态渲染生成的可交互元素
        const bindCursorEvents = () => {
            const interactiveElements = document.querySelectorAll('a, .gallery-item');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                    cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                    cursor.style.border = 'none';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                });
            });
        };
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
});

// 数据渲染函数
function renderData() {
    if (typeof siteData === 'undefined') return;

    // 渲染首屏
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer) {
        heroContainer.innerHTML = `
            <h1 class="title">${siteData.hero.title}</h1>
            <p class="subtitle">你好，我是 <span>${siteData.hero.name}</span></p>
            <p class="description">${siteData.hero.description}</p>
        `;
    }

    // 渲染教育背景
    const eduContainer = document.getElementById('education-container');
    if (eduContainer) {
        let eduHTML = `<p>${siteData.education.university}</p>`;
        siteData.education.items.forEach(item => {
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

    // 渲染专业技能
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        siteData.skills.forEach(skill => {
            skillsContainer.innerHTML += `
                <div class="skill-item">
                    <div class="skill-title">${skill.title}</div>
                    <div class="skill-desc">${skill.desc}</div>
                </div>
            `;
        });
    }

    // 渲染核心经历 - 实习
    const expContainer = document.getElementById('experience-container');
    if (expContainer) {
        siteData.experience.forEach(exp => {
            expContainer.innerHTML += `
                <div class="work-item">
                    <h3 class="work-title">${exp.title}</h3>
                    <div class="work-meta">${exp.meta}</div>
                    <p class="work-desc">${exp.desc}</p>
                </div>
            `;
        });
    }

    // 渲染核心经历 - 项目
    const projContainer = document.getElementById('projects-container');
    if (projContainer) {
        siteData.projects.forEach(proj => {
            projContainer.innerHTML += `
                <div class="gallery-item">
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
        siteData.publications.forEach(pub => {
            pubContainer.innerHTML += `
                <li><span class="pub-tag">${pub.tag}</span> ${pub.content}</li>
            `;
        });
    }

    // 渲染联系方式
    const contactContainer = document.getElementById('contact-container');
    if (contactContainer) {
        contactContainer.innerHTML = `
            <a href="mailto:${siteData.contact.email}" class="link">发送邮件 ↗</a>
            <a href="${siteData.contact.resume}" class="link" target="_blank">简历下载 (PDF) ↗</a>
            <a href="tel:${siteData.contact.phoneLink}" class="link">${siteData.contact.phone} ↗</a>
        `;
    }

    // 渲染底部版权
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `<p>&copy; ${new Date().getFullYear()} ${siteData.hero.name}. All rights reserved.</p>`;
    }
}