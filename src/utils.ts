export type MetadataBlogPost = {
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