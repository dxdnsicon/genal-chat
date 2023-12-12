import { decrypt } from '@/utils/common';

function getRandomElement(arr: string[]) {
  if (Array.isArray(arr) && arr.length > 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  } else {
    console.error('输入不是一个非空数组！');
    return '';
  }
}

const defaultWords = [
  '用我辛勤劳动的汗水，浇灌祖国参天大树。',
  '在爬满金文的钟鼎之上，读祖国童年的灵性；在布满烽火的长城之上，读祖国青春的豪放；在缀满诗歌与科学的大地之上，读祖国壮年的成熟……',
  '只是那一个声音，融化了国人僵硬的思想，门扉打开了，窗户明亮起来了，中国向前迈进的步伐更加的.坚定了。东方的这颗太阳开始发出耀眼的光芒。走过黑夜，迎来又一个全新的世界。我们走过崎岖，历过磨难，才会愈加的成熟，我们的信念才能更加的坚定。用我们的行动来谱写我们祖国那不朽的史诗。',
  '不一样的民族，同一个祖国。母亲的生日，同喜同喜。',
  '没有国，哪有家；没有家，哪有你我。国庆来临，让我们一起祝愿国圆家圆，家和万事兴。',
  '五星红旗是祖国的象征，不管风云怎样变幻，我们对祖国的眷恋矢志不移，如果对着千百种选择，我们会毫不犹豫地扑人你的`怀抱。用你的风雨之声做语言，用你的自然之形做文字，以你的土地做肤色，以你的五岳做骨骼，选择你的辛劳当痛苦，选择你的幸福当快乐。国旗，我们永远的信念！',
  '让我把青春镌刻成精致的玉雕，让我把年轻书写成激情的诗行，让我把爱国情制成坚固的船桨，让我把信仰化作前进的力量。让我的人生之船远航！',
  '不忘初心，牢记使命，愿祖国繁荣昌盛。',
  '我们就是中国，中国就是我们。我们勇敢地承担起自己的使命，祝祖国更加美好！',
  '因为爱国，才有了文天祥人生自古谁无死，留取丹心照汗青。因为爱国，才有了范忠淹先天下之忧而忧，后天下之乐而乐。因为爱国，才有了陆放翁夜阑卧听风吹雨，铁马冰河入梦来。 (作文大全 www.Ivzw.com)',
  '如果胃囊空空，谁也难以成为爱国志士。',
  '祖国母亲，愿你更加繁荣富强！我要努力学习，做一个对社会有用的人！',
  '大海用涛声歌颂，大山用巍峨见证，大地用缄默宣誓：祖国，我为你骄傲。',
  '祖国是我们伟大的母亲，不辞辛劳地哺育了我们十三亿的人民；祖国是实现我们梦想的摇篮，帮助我们踏进理想的殿堂；祖国是一幅壮阔美丽的风景画，带给我们无限的自豪与荣耀；祖国是藏在中国人心中的一个信念，让我们永远不低头放弃。',
  '没有一个不爱自己国家的国民。我当然也不例外，我爱养育了我年的土地，她是举世闻名的四大古国，她是有着浩大历史神秘的国家，她是如此美丽，如此伟大。我因为生在养在这片土地的人而感到无比的自豪。',
  '感动的话千千万，汇成一句，我爱你中国！祝福祖国繁荣昌盛。',
  '从今天做起，发奋学习，展望未来，祖国必将因为我们而更加精彩！',
  '祖国，是一曲永不落幕的乐章，每个音符，都那么令我为之心动；祖国，是一幅永不褪色的画卷，每道炫彩，都那么令我为之心悦；祖国，是一泓永不浑浊的乳汁，每滴暖流，都那么令我为之心甜。',
  '惟有民魂是值得宝贵的，惟有它发扬起来，中国人才有真进步。',
  '为祖国点赞，祝愿祖国繁荣富强，国泰民安。',
];

const remkaeMessage = (content: string) => {
  try {
    const msg = decrypt(content, true);
    if (!msg) {
      return getRandomElement(defaultWords);
    }
    return msg;
  } catch (e) {
    return getRandomElement(defaultWords);
  }
};

export default function remakeChat(payload: any): any {
  console.log('payload', payload);
  if (Array.isArray(payload)) {
    payload.forEach((item) => {
      if (item.content) {
        item.content = remkaeMessage(item.content);
      }
    });
  } else {
    if (payload?.content) {
      payload.content = remkaeMessage(payload?.content);
    }
  }
  return payload;
}
