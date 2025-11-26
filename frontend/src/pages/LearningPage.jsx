import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Search, HelpCircle, Lightbulb, BookOpen, ExternalLink, Video } from "lucide-react";
import { useLearningContent, useLearningCategories } from "../hooks/api.js";
import { formatDate } from "../utils/helpers.js";

export default function LearningPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const locale = i18n.language;
  
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get categories
  const { data: categories = [] } = useLearningCategories();

  // Fetch content based on active tab
  const contentParams = useMemo(() => {
    const params = {
      type: activeTab === "faq" ? "faq" : activeTab === "tip" ? "tip" : "article",
      page: 1,
      limit: 100,
      language: locale,
    };
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    return params;
  }, [activeTab, searchQuery, selectedCategory, locale]);

  const { data: contentData, isLoading, error } = useLearningContent(contentParams);
  const content = contentData?.content || [];

  // Fetch all content for all tabs to calculate tab counts
  // Only fetch when a category is selected (to show counts on tabs)
  const faqContentParams = useMemo(() => {
    if (!selectedCategory) return null;
    const params = { type: "faq", page: 1, limit: 1000, language: locale };
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    return params;
  }, [selectedCategory, searchQuery, locale]);

  const tipContentParams = useMemo(() => {
    if (!selectedCategory) return null;
    const params = { type: "tip", page: 1, limit: 1000, language: locale };
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    return params;
  }, [selectedCategory, searchQuery, locale]);

  const articleContentParams = useMemo(() => {
    if (!selectedCategory) return null;
    const params = { type: "article", page: 1, limit: 1000, language: locale };
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    return params;
  }, [selectedCategory, searchQuery, locale]);

  const { data: faqContentData, isLoading: isLoadingFaq } = useLearningContent(faqContentParams);
  const { data: tipContentData, isLoading: isLoadingTip } = useLearningContent(tipContentParams);
  const { data: articleContentData, isLoading: isLoadingArticle } = useLearningContent(articleContentParams);

  // Fetch all content for current active tab without category filter to calculate category counts
  // Only fetch when a category is selected (to show counts on category buttons)
  const allContentForCategoryCounts = useMemo(() => {
    if (!selectedCategory) return null;
    
    const params = {
      type: activeTab === "faq" ? "faq" : activeTab === "tip" ? "tip" : "article",
      page: 1,
      limit: 1000, // Get all to calculate counts
      language: locale,
    };
    if (searchQuery) params.search = searchQuery;
    // Don't include category filter - we want all content to count by category
    return params;
  }, [activeTab, searchQuery, locale, selectedCategory]);

  const { data: allContentData } = useLearningContent(allContentForCategoryCounts);
  const allContent = allContentData?.content || [];

  // Calculate counts for each tab type when category is selected
  const tabCounts = useMemo(() => {
    if (!selectedCategory) return null;
    
    // Always return an object with counts, even if data is still loading
    // Access content array safely - the data structure is { content: [...], pagination: {...} }
    const faqCount = Array.isArray(faqContentData?.content) ? faqContentData.content.length : 0;
    const tipCount = Array.isArray(tipContentData?.content) ? tipContentData.content.length : 0;
    const articleCount = Array.isArray(articleContentData?.content) ? articleContentData.content.length : 0;
    
    return {
      faq: faqCount,
      tip: tipCount,
      article: articleCount,
    };
  }, [selectedCategory, faqContentData, tipContentData, articleContentData]);

  // Calculate counts for each category based on current active tab
  // Only show counts when a category is selected (clicked)
  const categoryCounts = useMemo(() => {
    if (!selectedCategory || !allContent.length) return {};
    
    const counts = {};
    categories.forEach((cat) => {
      counts[cat] = allContent.filter((c) => c.category === cat).length;
    });
    return counts;
  }, [categories, allContent, selectedCategory]);

  const tabs = [
    {
      id: "faq",
      label: t("learning.faqs", { defaultValue: "FAQs" }),
      icon: HelpCircle,
    },
    {
      id: "tip",
      label: t("learning.tips", { defaultValue: "Tips" }),
      icon: Lightbulb,
    },
    {
      id: "article",
      label: t("learning.articles", { defaultValue: "Articles" }),
      icon: BookOpen,
    },
  ];

  return (
    <div className={`min-h-screen bg-animated py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title={t("navigation.learning", { defaultValue: "Learning" })}
          subtitle={t("learning.subtitle", {
            defaultValue: "Learn from our FAQs, tips, and articles",
          })}
        />

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <Input
              type="text"
              placeholder={t("learning.searchPlaceholder", {
                defaultValue: "Search...",
              })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              variant="modern"
            />
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
              >
                {t("learning.allCategories", { defaultValue: "All Categories" })}
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {t(`categories.${cat}`, { defaultValue: cat })}
                  {selectedCategory && categoryCounts[cat] !== undefined && (
                    <span className="ltr:ml-2 rtl:mr-2 px-1.5 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                      {categoryCounts[cat]}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-secondary-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                  isActive
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-secondary-600 hover:text-secondary-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
                {selectedCategory && (
                  <span className="text-sm bg-secondary-100 px-2 py-0.5 rounded-full">
                    {tabCounts?.[tab.id] ?? 0}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-secondary-500">{t("common.loading")}</p>
          </div>
        ) : content.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-500">
              {t("learning.noContent", {
                defaultValue: "No content available",
              })}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "faq" && (
              <FAQsList faqs={content.filter((c) => c.type === "faq")} locale={locale} />
            )}
            {activeTab === "tip" && (
              <TipsList tips={content.filter((c) => c.type === "tip")} locale={locale} />
            )}
            {activeTab === "article" && (
              <ArticlesList
                articles={content.filter((c) => c.type === "article")}
                locale={locale}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// FAQs Component (Accordion style)
function FAQsList({ faqs, locale }) {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);

  if (faqs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500">{t("learning.noFAQs", { defaultValue: "No FAQs available" })}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isExpanded = expandedId === faq._id;
        const title = faq.title?.[locale] || faq.title?.en || "";
        const content = faq.content?.[locale] || faq.content?.en || "";
        const references = faq.references || [];

        return (
          <Card key={faq._id} className="border border-secondary-200">
            <CardHeader
              className="cursor-pointer hover:bg-secondary-50 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : faq._id)}
            >
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg">{title}</CardTitle>
                <button className="text-secondary-400 hover:text-secondary-600">
                  {isExpanded ? "−" : "+"}
                </button>
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent className="pt-0">
                <div className="prose max-w-none">
                  <p className="text-secondary-700 whitespace-pre-wrap">{content}</p>
                </div>
                {references.length > 0 && (
                  <ReferencesSection references={references} />
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// Tips Component (Grid of cards)
function TipsList({ tips, locale }) {
  const { t } = useTranslation();
  const [selectedTip, setSelectedTip] = useState(null);

  if (tips.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500">{t("learning.noTips", { defaultValue: "No tips available" })}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => {
          const title = tip.title?.[locale] || tip.title?.en || "";
          const content = tip.content?.[locale] || tip.content?.en || "";
          const preview = content.substring(0, 150) + (content.length > 150 ? "..." : "");

          return (
            <Card
              key={tip._id}
              className="card-modern cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTip(tip)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 line-clamp-3">{preview}</p>
                {tip.references && tip.references.length > 0 && (
                  <p className="text-xs text-primary-600 mt-2">
                    {tip.references.length} {t("learning.references", { defaultValue: "reference(s)" })}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedTip && (
        <ContentDetailModal
          content={selectedTip}
          locale={locale}
          onClose={() => setSelectedTip(null)}
        />
      )}
    </>
  );
}

// Articles Component (Grid with images)
function ArticlesList({ articles, locale }) {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary-500">
          {t("learning.noArticles", { defaultValue: "No articles available" })}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const title = article.title?.[locale] || article.title?.en || "";
          const content = article.content?.[locale] || article.content?.en || "";
          const preview = content.substring(0, 150) + (content.length > 150 ? "..." : "");
          const readingTime = article.readingTime?.[locale] || article.readingTime?.en || 0;

          return (
            <Card
              key={article._id}
              className="card-modern cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              onClick={() => setSelectedArticle(article)}
            >
              {article.thumbnailUrl && (
                <div className="aspect-video w-full overflow-hidden bg-secondary-100">
                  <img
                    src={article.thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>
                  {readingTime > 0 && (
                    <span className="text-xs">
                      {readingTime} {t("learning.minRead", { defaultValue: "min read" })}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-600 line-clamp-3">{preview}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  {article.references && article.references.length > 0 && (
                    <p className="text-primary-600">
                      {article.references.length} {t("learning.references", { defaultValue: "reference(s)" })}
                    </p>
                  )}
                  {article.recommendedVideos && article.recommendedVideos.length > 0 && (
                    <p className="text-cyan-600 flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      {article.recommendedVideos.length} {t("learning.videos", { defaultValue: "video(s)" })}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedArticle && (
        <ContentDetailModal
          content={selectedArticle}
          locale={locale}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}

// Content Detail Modal
function ContentDetailModal({ content, locale, onClose }) {
  const { t } = useTranslation();
  const title = content.title?.[locale] || content.title?.en || "";
  const contentText = content.content?.[locale] || content.content?.en || "";
  const references = content.references || [];
  const recommendedVideos = content.recommendedVideos || [];
  const readingTime = content.readingTime?.[locale] || content.readingTime?.en || 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-secondary-200 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">{title}</h2>
            {readingTime > 0 && (
              <p className="text-sm text-secondary-500">
                {readingTime} {t("learning.minRead", { defaultValue: "min read" })}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {content.thumbnailUrl && content.type === "article" && (
            <img
              src={content.thumbnailUrl}
              alt={title}
              className="w-full h-auto rounded-lg mb-6"
            />
          )}
          <div className="prose max-w-none">
            <p className="text-secondary-700 whitespace-pre-wrap">{contentText}</p>
          </div>

          {recommendedVideos.length > 0 && content.type === "article" && (
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <RecommendedVideosSection videos={recommendedVideos} />
            </div>
          )}

          {references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-secondary-200">
              <ReferencesSection references={references} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// References Section Component
function ReferencesSection({ references }) {
  const { t } = useTranslation();

  if (!references || references.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
        <ExternalLink className="h-5 w-5" />
        {t("learning.references", { defaultValue: "References" })}
      </h3>
      <div className="space-y-3">
        {references.map((ref, index) => (
          <a
            key={index}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-secondary-900">{ref.title || ref.url}</h4>
                {ref.description && (
                  <p className="text-sm text-secondary-600 mt-1">{ref.description}</p>
                )}
                <p className="text-xs text-primary-600 mt-2 break-all">{ref.url}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Recommended Videos Section Component
function RecommendedVideosSection({ videos }) {
  const { t } = useTranslation();

  if (!videos || videos.length === 0) return null;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Get YouTube thumbnail URL
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
        <Video className="h-5 w-5" />
        {t("learning.recommendedVideos", { defaultValue: "Recommended Videos" })}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => {
          const thumbnail = getYouTubeThumbnail(video.url);
          return (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-secondary-200 rounded-lg hover:border-cyan-300 hover:bg-cyan-50 transition-colors overflow-hidden group"
            >
              {thumbnail && (
                <div className="aspect-video w-full overflow-hidden bg-secondary-100 relative">
                  <img
                    src={thumbnail}
                    alt={video.title || "Video thumbnail"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4">
                <h4 className="font-semibold text-secondary-900 mb-1 line-clamp-2">
                  {video.title || video.url}
                </h4>
                {video.description && (
                  <p className="text-sm text-secondary-600 mt-1 line-clamp-2">{video.description}</p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
