// 多语言个人信息数据
const siteData = {
    zh: {
        // 导航
        nav: {
            about: "About",
            skills: "Skills",
            works: "Works",
            publications: "Publications",
            contact: "Contact"
        },
        // 首屏信息
        hero: {
            title: "Control & Robotics.",
            name: "郑皓文",
            nickname: "Arc",
            avatar: "images/Me/Arc.jpg",
            greeting: "你好，我是",
            description: "中山大学控制科学与工程硕士，机器人与无人机算法开发者。<br>专注于无人机自主规划、集群协同与强化学习控制。"
        },
        // 区块标题
        sectionTitles: {
            about: "01 / 教育背景",
            skills: "02 / 专业技能",
            works: "03 / 核心经历",
            publications: "04 / 论文与专利",
            blog: "05 / 技术博客",
            contact: "06 / 联系我"
        },
        // 教育背景
        education: {
            university: "中山大学 SYSU（双一流，985，211）",
            items: [
                {
                    degree: "控制科学与工程 硕士",
                    time: "2023.09 – 2026.06 (预计)",
                    desc: "智能工程学院，深圳校区"
                },
                {
                    degree: "通信工程 本科",
                    time: "2018.09 – 2023.06",
                    desc: "GPA：4.2 / 5.0 (Rank 2/66) | 校级优秀毕业生"
                }
            ]
        },
        // 专业技能
        skills: [
            {
                title: "工具与框架",
                desc: "精通 ROS1/ROS2 通信框架、Isaaclab/Isaacsim 机器人仿真训练工具、PX4-Autopilot 飞行控制栈。"
            },
            {
                title: "规划与控制",
                desc: "熟悉概率栅格地图构建、基于优化的运动规划、微分平坦轨迹跟踪；掌握系统辨识与卡尔曼滤波。"
            },
            {
                title: "程序开发",
                desc: "精通 C++ (ROS) 和 Python (数据与模型训练) 开发。熟练使用 Docker、Linux shell、Git，具备规范代码管理能力。"
            },
            {
                title: "工程实战",
                desc: "主导过风机叶片自主巡检、共轴反桨无人机集群等多领域落地项目。"
            }
        ],
        // 实习经历
        experience: [
            {
                title: "微分智飞 (Differential Robotics) | 前沿创新实验室",
                meta: "算法实习生 · 浙江 杭州 · 2025.12 至今",
                desc: "参与无人机端到端自主避障飞行算法研究，聚焦强化学习。基于 Isaaclab 搭建完整训练框架，完成无人机动力学模块仿真建模与 PX4 角速度控制器迁移适配；采用 PPO 算法训练深度图输入的四旋翼避障策略，实现仿真环境最高 10m/s 高速避障飞行，并部署至 ROS2 实现 sim2sim 验证。"
            }
        ],
        // 项目经历
        projects: [
            {
                image: "images/coaxial/coaxial_flying.jpg",
                title: "共轴双旋翼集群飞行系统",
                time: "2025.01-2025.09",
                desc: "主导设计总体软件方案。实现基于 GPS 定位和下视 TOF 的单机融合定位方案，搭建基于 UWB 组网的多机相互通信和相互定位框架。使用基于可微队形相似度度量的编队维持算法实现六架无人机编队飞行。同时实现基于 Apriltag 和卡尔曼滤波的移动目标追踪，使用深度图避障规划算法实现四机协同跟踪。"
            },
            {
                image: "images/windturbine/winturbine_paper.png",
                title: "风机叶片全覆盖巡检系统",
                time: "2023.07-2024.02",
                desc: "提出结合激光雷达点云拟合、几何特征提取的方法，在线估计风机姿态与叶片长度等参数，识别率达 98% 以上。跟随团队常驻风电场半年，在 5 个风场的 10 种风机进行逾 600 次实机测试，巡检图像获风电场认可并已用于缺陷检测。"
            }
        ],
        // 论文与专利
        publications: [
            {
                tag: "期刊 · 已接收",
                content: `Yichuan Shi, Hao Liu, <strong>Haowen Zheng</strong> et al. <em>"WTBInspector: An Automated UAV-based Wind Turbine Blade Inspection System"</em>. <strong>IEEE Transactions on Field Robotics (T-FR)</strong> (SCI 二区, Robotics 顶刊)`
            },
            {
                tag: "会议 · 已接收",
                content: `Yichuan Shi, Hao Liu, <strong>Haowen Zheng</strong> et al. <em>"Automated UAV-based Wind Turbine Blade Inspection: Blade Stop Angle Estimation and Blade Detail Prioritized Exposure Adjustment"</em>. <strong>IROS 2025</strong> (CCF C类, Robotics 顶会)`
            },
            {
                tag: "期刊 · 已接收",
                content: `Yuying Zhang, Na Fan, <strong>Haowen Zheng</strong> et al. <em>"Threat-Aware UAV Dodging of Human-Thrown Projectiles with an RGB-D Camera"</em>. (SCI 一区, Robotics 顶刊)`
            },
            {
                tag: "发明专利 · 已授权",
                content: `吕熙敏，施一川，<strong>郑皓文</strong>等. <em>风力发电机叶片检测方法、系统、装置及存储介质</em>. 专利号: ZL202411627912.1.`
            }
        ],
        // 联系方式
        contact: {
            email: "zhenghw@mail2.sysu.edu.cn",
            resume: "resume/Haowen_Zheng_Resume.pdf",
            phone: "+86 15602534202",
            phoneLink: "+8615602534202",
            emailText: "发送邮件 ↗",
            resumeText: "简历下载 (PDF) ↗"
        }
    },

    en: {
        // 导航
        nav: {
            about: "About",
            skills: "Skills",
            works: "Works",
            publications: "Publications",
            contact: "Contact"
        },
        // 首屏信息
        hero: {
            title: "Control & Robotics.",
            name: "Haowen Zheng",
            nickname: "Arc",
            avatar: "images/Me/Arc.jpg",
            greeting: "Hello, I'm",
            description: "M.Sc. in Control Science & Engineering at Sun Yat-sen University.<br>Focused on UAV autonomous planning, swarm coordination & reinforcement learning control."
        },
        // 区块标题
        sectionTitles: {
            about: "01 / Education",
            skills: "02 / Skills",
            works: "03 / Experience",
            publications: "04 / Publications",
            blog: "05 / Blog",
            contact: "06 / Contact"
        },
        // 教育背景
        education: {
            university: "Sun Yat-sen University (SYSU) — Project 985 & 211",
            items: [
                {
                    degree: "M.Sc. Control Science & Engineering",
                    time: "Sep 2023 – Jun 2026 (Expected)",
                    desc: "School of Intelligent Engineering, Shenzhen Campus"
                },
                {
                    degree: "B.Eng. Communication Engineering",
                    time: "Sep 2018 – Jun 2023",
                    desc: "GPA: 4.2 / 5.0 (Rank 2/66) | Outstanding Graduate"
                }
            ]
        },
        // 专业技能
        skills: [
            {
                title: "Tools & Frameworks",
                desc: "Proficient in ROS1/ROS2, Isaaclab/Isaacsim robot simulation, PX4-Autopilot flight control stack."
            },
            {
                title: "Planning & Control",
                desc: "Occupancy grid mapping, optimization-based motion planning, differential-flatness trajectory tracking; Kalman filter & system identification."
            },
            {
                title: "Programming",
                desc: "Expert in C++ (ROS projects) and Python (data processing & model training). Proficient with Docker, Linux shell, and Git."
            },
            {
                title: "Field Experience",
                desc: "Led projects in autonomous wind turbine blade inspection and coaxial counter-rotating UAV swarms."
            }
        ],
        // 实习经历
        experience: [
            {
                title: "Differential Robotics | Frontier Innovation Lab",
                meta: "Algorithm Intern · Hangzhou, China · Dec 2025 – Present",
                desc: "Researching end-to-end autonomous UAV obstacle avoidance via reinforcement learning. Built a complete training pipeline with Isaaclab including dynamics modeling and PX4 angular-rate controller adaptation. Trained a depth-map-based quadrotor avoidance policy using PPO, achieving up to 10 m/s obstacle avoidance in simulation, deployed to ROS2 for sim2sim verification."
            }
        ],
        // 项目经历
        projects: [
            {
                image: "images/coaxial/coaxial_flying.jpg",
                title: "Coaxial Dual-Rotor UAV Swarm System",
                time: "Jan 2025 – Sep 2025",
                desc: "Led overall software architecture design. Implemented GPS + downward-facing ToF fused localization, UWB-based multi-UAV communication and relative positioning. Achieved 6-UAV formation flight via differentiable formation similarity metrics, and 4-UAV cooperative moving target tracking with depth-based obstacle avoidance."
            },
            {
                image: "images/windturbine/winturbine_paper.png",
                title: "Autonomous Wind Turbine Blade Inspection",
                time: "Jul 2023 – Feb 2024",
                desc: "Proposed LiDAR point-cloud fitting and geometric feature extraction for online wind turbine pose & blade parameter estimation (>98% success rate). Conducted 600+ field tests across 5 wind farms on 10 turbine models over 6 months. Inspection imagery approved by operators and deployed for defect detection."
            }
        ],
        // 论文与专利
        publications: [
            {
                tag: "Journal · Accepted",
                content: `Yichuan Shi, Hao Liu, <strong>Haowen Zheng</strong> et al. <em>"WTBInspector: An Automated UAV-based Wind Turbine Blade Inspection System"</em>. <strong>IEEE Transactions on Field Robotics (T-FR)</strong>`
            },
            {
                tag: "Conference · Accepted",
                content: `Yichuan Shi, Hao Liu, <strong>Haowen Zheng</strong> et al. <em>"Automated UAV-based Wind Turbine Blade Inspection: Blade Stop Angle Estimation and Blade Detail Prioritized Exposure Adjustment"</em>. <strong>IROS 2025</strong>`
            },
            {
                tag: "Journal · Accepted",
                content: `Yuying Zhang, Na Fan, <strong>Haowen Zheng</strong> et al. <em>"Threat-Aware UAV Dodging of Human-Thrown Projectiles with an RGB-D Camera"</em>. (SCI Q1, Top Robotics Journal)`
            },
            {
                tag: "Patent · Granted",
                content: `Ximin Lv, Yichuan Shi, <strong>Haowen Zheng</strong> et al. <em>Wind Turbine Blade Detection Method, System, Device and Storage Medium</em>. Patent No. ZL202411627912.1`
            }
        ],
        // 联系方式
        contact: {
            email: "zhenghw@mail2.sysu.edu.cn",
            resume: "resume/Haowen_Zheng_Resume.pdf",
            phone: "+86 15602534202",
            phoneLink: "+8615602534202",
            emailText: "Send Email ↗",
            resumeText: "Download Resume (PDF) ↗"
        }
    }
};