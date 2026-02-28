// title: Typst 博客示例 - 用 Typst 写技术文档
// created: 2026-03-01
// updated: 2026-03-01
// tags: [Typst, 示例]

#set page(width: 800pt, margin: (x: 40pt, y: 40pt))
#set text(font: ("Inter", "Noto Serif SC"), size: 12pt, fill: rgb("#f0f0f0"))
#set page(fill: rgb("#0a0a0a"))
#set heading(numbering: "1.")
#set par(leading: 1em, justify: true)

#show heading: set text(fill: rgb("#ffffff"))
#show raw: set text(fill: rgb("#c0c0c0"), font: "Consolas", size: 10pt)
#show link: set text(fill: rgb("#88aaff"))

= 为什么选择 Typst？

Typst 是一种新兴的排版语言，兼具 LaTeX 的专业排版能力和 Markdown 的简洁语法。对于技术博客来说，它有以下优势：

- *公式排版*：原生支持数学公式，无需额外配置
- *代码高亮*：内置代码块语法
- *快速编译*：增量编译速度极快

== 数学公式示例

Typst 的公式语法比 LaTeX 更直观。例如四旋翼动力学模型：

$ dot(bold(x)) = f(bold(x)) + g(bold(x)) bold(u) $

其中状态向量 $bold(x) = [p_x, p_y, p_z, phi, theta, psi, dot(p)_x, dot(p)_y, dot(p)_z, dot(phi), dot(theta), dot(psi)]^T$

控制输入 $bold(u) = [f_1, f_2, f_3, f_4]^T$ 为四个电机的推力。

牛顿-欧拉方程：

$ m dot.double(bold(p)) = bold(R) vec(0, 0, sum_(i=1)^4 f_i) - m vec(0, 0, g) $

$ bold(J) dot(bold(omega)) = bold(tau) - bold(omega) times bold(J) bold(omega) $

== 代码示例

```python
import numpy as np

class QuadrotorDynamics:
    def __init__(self, mass=1.5, arm_length=0.25):
        self.m = mass
        self.L = arm_length
        self.g = 9.81
        self.J = np.diag([0.0023, 0.0023, 0.004])
    
    def step(self, state, control, dt=0.01):
        """Forward dynamics integration"""
        forces = self.allocation_matrix @ control
        acc = forces[:3] / self.m - np.array([0, 0, self.g])
        return state + acc * dt
```

== 表格示例

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  fill: (x, y) => if y == 0 { rgb("#1a1a2e") } else { rgb("#111111") },
  [*参数*], [*符号*], [*值*],
  [质量], [$m$], [1.5 kg],
  [臂长], [$L$], [0.25 m],
  [转动惯量], [$J_(x x)$], [$2.3 times 10^(-3)$ kg·m²],
)


强化学习PPO 算法伪代码：
```python
def ppo_update(policy, value_function, data):
    for epoch in range(num_epochs):
        for batch in data.batches():
            # 计算优势函数
            advantages = compute_advantages(batch)
            # 更新策略网络
            policy_loss = compute_policy_loss(policy, batch, advantages)
            policy_optimizer.zero_grad()
            policy_loss.backward()
            policy_optimizer.step()
            # 更新价值网络
            value_loss = compute_value_loss(value_function, batch)
            value_optimizer.zero_grad()
            value_loss.backward()
            value_optimizer.step()
```

== 总结

Typst 非常适合写包含公式和代码的技术博客。通过 `build_blog.py` 脚本，`.typ` 文件会被自动编译为 SVG 并嵌入网页。
