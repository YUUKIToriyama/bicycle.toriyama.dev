import * as fs from 'fs/promises';
import markdownToHtml from 'zenn-markdown-html';

(async () => {
	// publicディレクトリを作成
	await fs.mkdir("./public");
	// articleディレクトリを探索
	const articleList = await fs.readdir("./articles");
	articleList.forEach(async article => {
		const srcDir = `./articles/${article}`;
		// 記事データの読み込み
		const markdown = await fs.readFile(`${srcDir}/article.md`, {
			encoding: "utf8"
		});
		// JSONLDの読み込み
		const jsonld = await fs.readFile(`${srcDir}/meta.jsonld`, {
			encoding: "utf8"
		});
		const metadata: MetadataBlogPost = JSON.parse(jsonld);
		// HTMLを作成しファイルに出力
		const html = `<html><head><title>${metadata.headline} | ${metadata.publisher.name}</title><script type="application/ld+json">${jsonld}</script></head><body>${markdownToHtml(markdown)}</body></html>`;
		const dstDir = `./public/${article}`
		await fs.mkdir(dstDir);
		await fs.writeFile(`${dstDir}/index.html`, html);
		// 画像データなどをコピー
		fs.readdir(srcDir).then(files => {
			files.forEach(fileName => {
				if (fileName.match(/.(md|jsonld)$/) === null) {
					fs.copyFile(`${srcDir}/${fileName}`, `${dstDir}/${fileName}`,);
				}
			});
		});
	});
})();

type MetadataBlogPost = {
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": string // ブログのURL
	},
	"headline": string, // 記事のタイトル
	"image": string, // 記事のトップ画像へのリンク
	"author": {
		"@type": "Person",
		"name": string, // 筆者の名前
		"url": string // 筆者のプロフィールページへのリンク
	},
	"publisher": {
		"@type": "Organization",
		"name": string, // 発行者の名前
		"logo": {
			"@type": "ImageObject",
			"url": string // ロゴのURL
		}
	},
	"datePublished": string, // 記事の作成日
	"dateModified": string // 記事の更新日
}