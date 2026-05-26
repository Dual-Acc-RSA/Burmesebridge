export const dictionary = {
  my: {
    nav: {
      home: "ပင်မ",
      news: "သတင်း",
      jobs: "အလုပ်အကိုင်",
      learn: "လေ့လာရန်",
      forum: "ဖိုရမ်",
      checkin: "ချက်အင်",
      admin: "အက်မင်",
    },
    common: {
      publish: "ထုတ်ပြန်ရန်",
      delete: "ဖျက်ရန်",
      save: "သိမ်းရန်",
      cancel: "မလုပ်တော့ပါ",
      edit: "ပြင်ရန်",
      loading: "ဖတ်နေသည်...",
      empty: "အချက်အလက် မရှိသေးပါ",
    },
    badge: {
      pinned: "ထိပ်ဆုံးပို့စ်",
      hot: "လူကြိုက်များ",
      featured: "အကြံပြု",
      verified: "အတည်ပြုပြီး",
      admin: "အက်မင်",
      teacher: "ဆရာ",
      member: "အသင်းဝင်",
    },
  },

  zh: {
    nav: {
      home: "首页",
      news: "新闻",
      jobs: "工作",
      learn: "学习",
      forum: "论坛",
      checkin: "签到",
      admin: "后台",
    },
    common: {
      publish: "发布",
      delete: "删除",
      save: "保存",
      cancel: "取消",
      edit: "编辑",
      loading: "加载中...",
      empty: "暂无内容",
    },
    badge: {
      pinned: "置顶",
      hot: "热门",
      featured: "推荐",
      verified: "已认证",
      admin: "管理员",
      teacher: "老师",
      member: "会员",
    },
  },

  en: {
    nav: {
      home: "Home",
      news: "News",
      jobs: "Jobs",
      learn: "Learn",
      forum: "Forum",
      checkin: "Check-in",
      admin: "Admin",
    },
    common: {
      publish: "Publish",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      loading: "Loading...",
      empty: "No content yet",
    },
    badge: {
      pinned: "Pinned",
      hot: "Hot",
      featured: "Featured",
      verified: "Verified",
      admin: "Admin",
      teacher: "Teacher",
      member: "Member",
    },
  },
};

export function getDictionary(locale: string) {
  if (locale === "my" || locale === "zh" || locale === "en") {
    return dictionary[locale];
  }

  return dictionary.my;
}