"""
博客索引生成脚本
扫描 blog/ 目录下的 .md 和 .typ 文件，提取元数据，生成 blog_data.js
- .md 文件：提取 frontmatter + Markdown 正文
- .typ 文件：提取注释元数据，用 typst 编译为 SVG
用法: python build_blog.py
"""

import os
import json
import re
import subprocess
import base64
import tempfile
import shutil
from pathlib import Path

BLOG_DIR = Path(__file__).parent / "blog"


def parse_md_frontmatter(filepath):
    """从 Markdown 文件中提取 frontmatter 元数据"""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        return None

    meta = {}
    for line in match.group(1).strip().split("\n"):
        line = line.strip()
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            value = [v.strip().strip("'\"") for v in value[1:-1].split(",")]
        meta[key] = value

    return meta


def parse_typ_frontmatter(filepath):
    """从 Typst 文件的注释中提取元数据（// key: value 格式）"""
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    meta = {}
    for line in lines:
        line = line.strip()
        if not line.startswith("//"):
            break
        line = line[2:].strip()
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            value = [v.strip().strip("'\"") for v in value[1:-1].split(",")]
        meta[key] = value

    return meta if meta else None


def compile_typst_to_svg(typ_file):
    """将 .typ 文件编译为 SVG 页面列表"""
    with tempfile.TemporaryDirectory() as tmp_dir:
        out_pattern = os.path.join(tmp_dir, "page-{n}.svg")
        try:
            result = subprocess.run(
                ["typst", "compile", str(typ_file), out_pattern],
                capture_output=True, text=True, encoding="utf-8", timeout=30
            )
            if result.returncode != 0:
                print(f"  ⚠ typst 编译失败: {result.stderr.strip()}")
                return None

            # 读取所有生成的 SVG 页面
            svgs = []
            for svg_file in sorted(Path(tmp_dir).glob("page-*.svg")):
                with open(svg_file, "r", encoding="utf-8") as f:
                    svgs.append(f.read())

            return svgs
        except FileNotFoundError:
            print("  ⚠ typst 未安装，请先安装: winget install Typst.Typst")
            return None
        except subprocess.TimeoutExpired:
            print("  ⚠ typst 编译超时")
            return None


def build_index():
    """扫描 blog/ 目录，生成 blog_data.js"""
    if not BLOG_DIR.exists():
        print("blog/ 目录不存在，请先创建。")
        return

    posts = []

    # 处理 Markdown 文件
    for md_file in BLOG_DIR.glob("*.md"):
        meta = parse_md_frontmatter(md_file)
        if not meta or "title" not in meta:
            print(f"⚠ 跳过 {md_file.name}（缺少 frontmatter 或 title）")
            continue

        with open(md_file, "r", encoding="utf-8") as f:
            raw = f.read()
        body_match = re.match(r"^---\s*\n.*?\n---\s*\n(.*)", raw, re.DOTALL)
        body = body_match.group(1).strip() if body_match else raw

        posts.append({
            "title": meta.get("title", md_file.stem),
            "file": md_file.name,
            "type": "md",
            "created": meta.get("created", ""),
            "updated": meta.get("updated", ""),
            "tags": meta.get("tags", []),
            "body": body,
        })
        print(f"  ✓ [MD]  {md_file.name}")

    # 处理 Typst 文件
    for typ_file in BLOG_DIR.glob("*.typ"):
        meta = parse_typ_frontmatter(typ_file)
        if not meta or "title" not in meta:
            print(f"⚠ 跳过 {typ_file.name}（缺少元数据或 title）")
            continue

        print(f"  编译 {typ_file.name} ...")
        svgs = compile_typst_to_svg(typ_file)
        if not svgs:
            continue

        posts.append({
            "title": meta.get("title", typ_file.stem),
            "file": typ_file.name,
            "type": "typst",
            "created": meta.get("created", ""),
            "updated": meta.get("updated", ""),
            "tags": meta.get("tags", []),
            "svgPages": svgs,
        })
        print(f"  ✓ [TYP] {typ_file.name} ({len(svgs)} 页)")

    # 按创建时间降序排列
    posts.sort(key=lambda p: p.get("created", ""), reverse=True)

    index_path = BLOG_DIR.parent / "blog_data.js"
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("// 自动生成，请勿手动编辑\n")
        f.write("const blogPosts = ")
        json.dump(posts, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(f"\n✅ 已生成 blog_data.js，共 {len(posts)} 篇文章")
    for p in posts:
        tag = "MD" if p["type"] == "md" else "TYP"
        print(f"   [{tag}] {p['title']} ({p['created']})")


if __name__ == "__main__":
    build_index()
