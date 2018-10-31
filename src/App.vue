<template>
    <div id="app">
        <geelist :list="list" :option="option">
          <template slot-scope="scope" slot="avatar">
              <img :src="scope.row.uploader.avatarUrl" style="width:20px;height:20px">
          </template>
        </geelist>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GeelistOption } from "./components/interface";

@Component({
  components: {}
})
export default class App extends Vue {
  list = [
    {
      hasDataPoint: false,
      updatedAt: "2018-10-10 23:13",
      createdAt: "2018-10-07 19:17",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 881,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-3",
      rank: 5,
      topic: "测试",
      description: "测试",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "",
      outputFormat: "",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T11:08:49.374Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 0,
      tagList: ["木有标签"],
      uploader: {
        id: 576,
        username: "zsj12345",
        email: "tom_zhu12345@163.com",
        bio: "我是李大钊",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/576-1538809429192.png",
        followedCount: 3,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-10 23:19",
      createdAt: "2018-10-07 16:47",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 880,
      isDelayJudge: false,
      source: "派生题",
      serialNumber: "T-9",
      rank: 5,
      topic: "测试",
      description: "测试",
      limitTime: 2000,
      limitMemory: 128,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "",
      outputFormat: "",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T08:33:30.586Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 0,
      tagList: ["木有标签"],
      uploader: {
        id: 657,
        username: "Andyluo",
        email: "renping_luo@aliyun.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/657-1538441351458.jpeg",
        followedCount: 1,
        solvedCount: 1,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-10 23:14",
      createdAt: "2018-10-07 16:29",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 879,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-4",
      rank: 1,
      topic: "测试",
      description: "测试",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "",
      outputFormat: "",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T08:16:52.262Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 0,
      tagList: ["木有标签"],
      uploader: {
        id: 576,
        username: "zsj12345",
        email: "tom_zhu12345@163.com",
        bio: "我是李大钊",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/576-1538809429192.png",
        followedCount: 3,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-07 15:54",
      createdAt: "2018-10-07 15:22",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 874,
      isDelayJudge: false,
      source: "",
      serialNumber: "ACM-2186-66",
      rank: 4,
      topic: "密码是什么",
      description:
        "题目描述\n有了防护伞，并不能完全避免 2012 的灾难。地球防卫小队决定去求助外星种族的帮 助。经过很长时间的努力，小队终于收到了外星生命的回信。但是外星人发过来的却是一 串密码。只有解开密码，才能知道外星人给的准确回复。解开密码的第一道工序就是解压 缩密码，外星人对于连续的若干个相同的子串“X”会压缩为“[DX]”的形式（D 是一个整 数且 1≤D≤99），比如说字符串“CBCBCBCB”就压缩为“[4CB]”或者“[2[2CB]]”，类 似于后面这种压缩之后再压缩的称为二重压缩。如果是“[2[2[2CB]]]”则是三重的。现 在我们给你外星人发送的密码，请你对其进行解压缩。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "输入格式：\n第一行：一个字符串",
      outputFormat: "输出格式：\n第一行：还是一个字符串",
      dataRange:
        "【数据范围】\n\n对于 50%的数据：解压后的字符串长度在 1000 以内，最多只有三重压缩。\n\n对于 100%的数据：解压后的字符串长度在 20000 以内，最多只有十重压缩。 对于 100%的数据：保证只包含数字、大写字母、’[‘和’]‘",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T07:19:32.495Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "AC[3FUN]",
          output: "ACFUNFUNFUN",
          note: ""
        }
      ],
      acceptPercent: 0,
      tagList: ["普及"],
      uploader: {
        id: 684,
        username: "傲雪凌霜宋子琛",
        email: "1901795654@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/684-1538894900246.jpeg",
        followedCount: 2,
        solvedCount: 1,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-07 15:37",
      createdAt: "2018-10-07 15:18",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 873,
      isDelayJudge: false,
      source: "",
      serialNumber: "ACM-6666-6666",
      rank: 5,
      topic: "路线规划",
      description:
        "题目描述\n2010年，世博会在中国上海举办，吸引了数以千万计的中外游客前来参观。暑假期间小Z也来到了上海世博园， 她对世博园的拥挤早有所闻，对有的展馆甚至要排上好几个小时的队才能进入也做好了充分准备，但为了使得自己的世博之旅更加顺利舒畅，小Z决定在游玩之前先 制定一份详细的旅行路线。\n\n小Z搜集到了世博园的地图，她发现从整体上看世博园是一块非常狭长的区域，而每一个展馆占用了其中一个几乎相同大小的方块。因此可以将整个园区看成一个n × m的矩阵(n≤3)，其中每一个格子为一个主题展馆。\n\n由于不同展馆受到的关注度会有一些差别，因此排队时间的长短也不尽相同。小Z根据统计信息给每一个展馆(x, y)标记了Tx,y = 0或1，如果Tx,y = 1，表示这个展馆非常热门，需要排很长时间的队；如果Tx,y = 0，表示这个展馆相对比较普通，几乎不需要排队即可进入参观。小Z希望能够制定一份合理的路线，使得能交替参观热门馆和普通馆，既不会因为总是参观热门馆 而长时间在排队，也不会因为总是参观普通馆而使得游览过于平淡。同时，小Z办事很讲究效率，她希望在游遍所有展馆的同时，又不会走冤枉路浪费体力。因此她希望旅行路线满足以下几个限制：\n\n1,在参观完位于(x, y)的展馆后，下一个参观的是一个相邻的且未被参观过的展馆(x', y')，即 |x-x'|+|y-y'|=1；\n2,路线的起点位于整个矩阵的边界上，即x = 1或x = n或y = 1或y = m；\n她制定了一个长度为n*m的 01 序列L，她希望第i个参观的展馆(x,y)满足Tx,y=Li。\n\n小Z想知道有多少条不同的旅行路线能够满足她的要求。由于最终的结果可能很大，小Z只想知道可行的旅行路线总数mod 11192869的值。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat:
        "输入格式：\n第一行包含两个正整数n, m。\n\n第2行至第n+ 1行，每行有m个01整数，其中第i+ 1行第j个数表示Ti,j。\n\n第n+ 2行有n*m个01整数，其中第i个数表示Li的值。",
      outputFormat:
        "输出格式：\n仅包含一个整数，表示可行的旅行路线总数mod 11192869的值。",
      dataRange:
        "【数据规模和约定】 对于10%的数据：n=1；\n\n对于30%的数据：n=2；\n\n对于60%的数据：n= 3，其中20%的数据Ti,j全为0；\n\n对于100%的数据：m≤50，Li, Ti,j = 0或1。",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T07:15:02.796Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "2 2\n10\n01\n1010",
          output: "4",
          note:
            "【样例说明】\n\n这四条可行的旅行路线分别为：\n\n(1,1)→(1,2)→(2,2)→(2,1)\n(1,1)→(2,1)→(2,2)→(1,2)\n(2,2)→(1,2)→(1,1)→(2,1)\n(2,2)→(2,1)→(1,1)→(1,2)"
        }
      ],
      acceptPercent: 0,
      tagList: ["高性能"],
      uploader: {
        id: 682,
        username: "清风明月晓星尘",
        email: "1901795653@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/682-1538719617242.jpeg",
        followedCount: 2,
        solvedCount: 1,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-07 15:46",
      createdAt: "2018-10-07 15:13",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 872,
      isDelayJudge: false,
      source: "",
      serialNumber: "ACM-3128-3128",
      rank: 5,
      topic: "论文",
      description:
        "小张最近在忙毕设,所以一直在读论文。一篇论文是由许多单词组成但小张发现一个单词会在论文中出现很多次,他想知道每个单词分别在论文中出现了多少次。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat:
        "输入格式：\n第一行一个整数N,表示有N个单词。接下来N行每行一个单词,每个单词都由小写字母(a-z)组成。(N≤200)",
      outputFormat:
        "输出格式：\n输出N个整数,第i行的数表示第i个单词在文章中出现了多少次",
      dataRange:
        "数据范围\n30%的数据， 单词总长度不超过10^3\n\n100%的数据，单词总长度不超过10^6",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T07:08:32.424Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "3\na\naa\naaa",
          output: "6\n3\n1",
          note: ""
        }
      ],
      acceptPercent: 0,
      tagList: ["新手村"],
      uploader: {
        id: 586,
        username: "种思追的魏无羡",
        email: "1901795652@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/586-1538460381527.png",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-10 23:15",
      createdAt: "2018-10-07 14:40",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 871,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-5",
      rank: 5,
      topic: "测试",
      description: "测试",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "",
      outputFormat: "5",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T06:37:21.856Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 0,
      tagList: ["木有标签"],
      uploader: {
        id: 599,
        username: "3128",
        email: "18221913798@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl: "https://server.longint.org/public/avatar/defaultAvatar.png",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-10 23:17",
      createdAt: "2018-10-07 09:06",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 870,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-7",
      rank: 5,
      topic: "测试",
      description: "测试",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 23,
      acceptCount: 2,
      inputFormat: "",
      outputFormat: "",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-07T00:53:38.303Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 9,
      tagList: ["木有标签"],
      uploader: {
        id: 598,
        username: "GenghisLuo",
        email: "3048469941@qq.com",
        bio: "我是陈独秀",
        school: "上海市实验学校",
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/598-1538549404022.jpeg",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-09 23:18",
      createdAt: "2018-10-05 19:51",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 869,
      isDelayJudge: false,
      source: "",
      serialNumber: "SES-2018-5",
      rank: 5,
      topic: "谁是小K",
      description:
        "要求输入一个数组，数组的大小为N。再输入一个数K，使程序找出这个数组中第K小的数并输出。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 8,
      isCertificate: false,
      collectCount: 1,
      submitCount: 4,
      acceptCount: 3,
      inputFormat: "第一行两个数N与K。\n后面的N行每行一个数。",
      outputFormat: "输出第K小的数。",
      dataRange: "0<N<=1000,0<K<=1000",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-05T11:36:07.993Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "5 3\n1\n2\n3\n4\n5",
          output: "3",
          note: ""
        },
        {
          input: "4 1\n2\n7\n8\n4",
          output: "2",
          note: ""
        }
      ],
      acceptPercent: 75,
      tagList: ["木有标签"],
      uploader: {
        id: 598,
        username: "GenghisLuo",
        email: "3048469941@qq.com",
        bio: "我是陈独秀",
        school: "上海市实验学校",
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/598-1538549404022.jpeg",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: false,
      updatedAt: "2018-10-10 23:16",
      createdAt: "2018-10-04 23:02",
      isContest: false,
      isForked: true,
      forkedQuestionId: 860,
      id: 863,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-6",
      rank: 5,
      topic: "测试",
      description: "测试",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: false,
      collectCount: 0,
      submitCount: 0,
      acceptCount: 0,
      inputFormat: "",
      outputFormat: "",
      dataRange: "",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [],
      acceptPercent: 0,
      tagList: ["木有标签"],
      uploader: {
        id: 599,
        username: "3128",
        email: "18221913798@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl: "https://server.longint.org/public/avatar/defaultAvatar.png",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      forkedQuestion: {
        hasDataPoint: true,
        updatedAt: "2018-10-10 23:18",
        createdAt: "2018-10-04 20:57",
        isContest: false,
        isForked: false,
        forkedQuestionId: null,
        id: 860,
        isDelayJudge: false,
        source: "",
        serialNumber: "T-8",
        rank: 5,
        topic: "亮硬币",
        description:
          "一天，L和Z在图书馆里，L对Z说，我们一人去一块硬币，并亮出它的一面，若都是正面，我给你3元，若都是负面，我给你1元；如果不同则你给我2元。\n现在已知L出正面的概率为a；求Z出正面的概率使得平均每局Z的收益最多（保留三位小数输出）并输出每局的平均最大收益（保留三位小数）。",
        limitTime: 1000,
        limitMemory: 128,
        commentCount: 2,
        isCertificate: false,
        collectCount: 0,
        submitCount: 5,
        acceptCount: 1,
        inputFormat: "第一行为一个浮点数a，表示L出正面的概率。",
        outputFormat:
          "输出一个浮点数b(保留三位小数），表示Z出正面的概率\n第二行是浮点数k（保留三位小数），表示Z每局的平均最大收益。",
        dataRange: "0<=a<=1",
        isAllowedFork: false,
        isShowRightCode: false,
        isShowDataPoint: false,
        displayTime: "2018-10-04T12:40:41.381Z",
        difficulty: 6,
        isDifficultyRight: false,
        exampleList: [
          {
            input: "1",
            output: "1.000\n3.000",
            note: ""
          },
          {
            input: "0",
            output: "0.000\n1.000",
            note: ""
          }
        ],
        acceptPercent: 20,
        collaboratorList: [],
        isAllowedEdit: false,
        isAllowedResubmit: false
      },
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-10 23:18",
      createdAt: "2018-10-04 20:57",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 860,
      isDelayJudge: false,
      source: "",
      serialNumber: "T-8",
      rank: 5,
      topic: "亮硬币",
      description:
        "一天，L和Z在图书馆里，L对Z说，我们一人去一块硬币，并亮出它的一面，若都是正面，我给你3元，若都是负面，我给你1元；如果不同则你给我2元。\n现在已知L出正面的概率为a；求Z出正面的概率使得平均每局Z的收益最多（保留三位小数输出）并输出每局的平均最大收益（保留三位小数）。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 2,
      isCertificate: false,
      collectCount: 0,
      submitCount: 5,
      acceptCount: 1,
      inputFormat: "第一行为一个浮点数a，表示L出正面的概率。",
      outputFormat:
        "输出一个浮点数b(保留三位小数），表示Z出正面的概率\n第二行是浮点数k（保留三位小数），表示Z每局的平均最大收益。",
      dataRange: "0<=a<=1",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-10-04T12:40:41.381Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "1",
          output: "1.000\n3.000",
          note: ""
        },
        {
          input: "0",
          output: "0.000\n1.000",
          note: ""
        }
      ],
      acceptPercent: 20,
      tagList: ["木有标签"],
      uploader: {
        id: 599,
        username: "3128",
        email: "18221913798@qq.com",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl: "https://server.longint.org/public/avatar/defaultAvatar.png",
        followedCount: 2,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-04 19:42",
      createdAt: "2018-09-29 22:27",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 839,
      isDelayJudge: false,
      source: "",
      serialNumber: "SBC-1",
      rank: 1,
      topic: "侦察李斯",
      description:
        "由于学生们课前打牌被抓，现在同学们需要侦查李斯$\\rightarrow$_$\\rightarrow$。\n\n李老师将会出现$n$天。李老师每天穿的衣服有一个显眼值$a_i$。如果李老师连续$m$天穿的衣服的显眼值大于等于$p$，则同学们会因为老师太漂亮了而放松警惕一天。如果在这天里李老师穿的衣服显眼值小于等于$q$，则同学们会被抓住。\n",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 7,
      acceptCount: 3,
      inputFormat:
        "第一行四个数，代表$n,m,p,q$。\n接下来n行每行一个数，表示$a_i$。",
      outputFormat:
        "一行，输出同学们会在第几天被抓住。如果不会被抓住输出$5ucceed$",
      dataRange:
        "$0$ $\\leq$ $m$ $\\leq$ $n$ $\\leq$ $100000$ $,$ $0$ $\\leq$ $p,q$ $\\leq$ $20000$  $,$ $a_i$ $\\leq$ $105$ ",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-09-29T14:24:13.485Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "8 4 9 4\n3\n8\n1\n9\n8\n4\n3\n8",
          output: "6",
          note: ""
        },
        {
          input: "4 2 5 3\n1\n4 \n1 \n1 ",
          output: "5ucceed",
          note: ""
        }
      ],
      acceptPercent: 43,
      tagList: [],
      uploader: {
        id: 656,
        username: "Thomasguo666",
        email: "Thomasguo666@outlook.org",
        bio: "暂无个签",
        school: null,
        legalName: "",
        isFrozen: false,
        avatarUrl: "https://server.longint.org/public/avatar/defaultAvatar.png",
        followedCount: 0,
        solvedCount: 2,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-04 22:56",
      createdAt: "2018-09-25 21:56",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 838,
      isDelayJudge: false,
      source: "",
      serialNumber: "LNOJ-fAKe-3",
      rank: 5,
      topic: "奇妙的空间站",
      description:
        '<span style="color:red;">**征求翻译！**</span>\n|本题征求翻译。如果你能提供翻译或者题意简述，请直接发在评论区，感谢你的贡献。|\n|-|\nYear 3000. Scientists found a mysterious space station. After months of work, they built a digital map of the station and sent a robot there for further investigation.\nThe map is an $n$×$m$ grid, each cell is either empty or an obstacle. The robot can move east, south, west or north one cell at a time. There is no light or other sensible substance in the space station, so the robot had to “blind walk”. Only if he fails to walk, it knows that there is an obstacle in front.\nThe map is special: all the obstacles are connected (via north, east, west, south directions), and all the empty cells are enclosed by the obstacles. Each two empty cells can be reached from each other, and there is no “tunnels” in the space station (i.e. for each empty cell, at least one of its north neighbor and south neighbor is empty, and at least one of its east neighbor and west neighbor is empty).\nWe number all empty cells $1, 2, 3, . . .$ from north to south, west to east like this:\n![1.png](https://server.longint.org/public/image/1537882631067.png)\nThere are also $k$ teleport controllers, each controller is connected with a pair of different empty cells (called teleport cell). Each teleport cell can be connected to at most one controller, and the $8$ neighbors of each teleport cell will not be another teleport cell or an obstacle.\nIf two teleport cells are connected to the same controller, once the robot walks into one of them, it’ll be teleported to the other cell, then move into the neighbor cell in the same direction. During the process, the robot is not aware of being teleported.\nThe scientists have already sent a robot to a particular cell. Due to technology restriction, the starting cell is always an empty cell that has a neighboring obstacle. For example, the robot can bevsent to cell $12$ in figure $1$.\nIf there is no teleport controller, when the robot moves EN, it’ll reach cell $8$. When he tries to move $N$, it’ll be blocked by an obstacle. However, if a teleport controller connects cell $10$ and $13$, the robot can successfully execute commands ENN. The actual route is $12$ $→$ $($$13$ $→$ $10$ $→$$)$$11$ $→$ $5$ $→$ $1$.\nYour task is to control the robot to discover all the teleport controllers within a reasonable amount of commands.\n',
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 4,
      acceptCount: 0,
      inputFormat:
        "$Your$ $program$ $should$ $read$ $from$ $standard$ $input$, $and$ $write$ $to$ $standard$ $output$$.$ ",
      outputFormat:
        "$After$ $printing$ $each$ $line$ $to$ $the$ $standard$ $output$, $you$ $should$ $flush$ $the$ $output$$,$ $by$ $calling$\n```C++\nfflush(stdout);\n```\n $or$\n```C++\ncout << flush\n``` \n$in$ $C/C++$, \n```Pascal\nflush(output)\n```\n $in$ $Pascal$ $and$\n```Java\nSystem.out.flush() \n``` \n$in$ $Java.$ $Please$ $read$ $general$ $instructions$ $for$ $interactive$ $problems$ $for$ $more$ $information.$",
      dataRange:
        'There will be at most $20$ test cases. For each test case, first read three integers $n, m$ and $k$ $($$6$$\\leq$$n$$,$$m$$\\leq$$15$$,$$1\\leq$$k$$\\leq5$). Then read $n$ lines, each contains $m$ characters. ‘.’ denotes empty cells, ‘*’ denotes obstacles, and ‘S’ denotes the starting cell. Then issue one or more ‘MoveRobot’ command and read the result. When you’re ready, issue exactly $k$ ‘Answer’ commands.\n|Command|Description|\n|-|-|\n|MoveRobot $D$|Try to move to direction $D$. return $‘1’$ if successful, $‘0’$ otherwise.|\n|Answer $pos1$ $pos2$|You found a teleport controller connecting empty cells $pos1$ and $pos2$. This command does not return anything.|\n\nNote that each teleport controller should be mentioned exactly once, but can be in any order.\nThe interaction ends when $n = m = k = 0.$\nIf your program violated any of these rules (bad format, invalid arguments etc), the server will exit immediately, and you will receive Protocol Violation (PV).\n<span style="color:red;">**Protocol Limit**</span>\nFor each test case, you can issue at most $32767$ ‘MoveRobot’ commands, otherwise you’ll get Protocol Limit Exceeded (PLE).',
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-09-25T13:29:18.331Z",
      difficulty: 6,
      isDifficultyRight: false,
      exampleList: [
        {
          input:
            "7 8 1\n********\n*****..*\n***....*\n*.....**\n*S.....*\n*......*\n********",
          output:
            "MoveRobot E\n1\nMoveRobot N\n1\nMoveRobot N\n1\nMoveRobot W\n0\nMoveRobot N\n0\nMoveRobot E\n1\nMoveRobot E\n0\nAnswer 10 13\n000",
          note: ""
        }
      ],
      acceptPercent: 0,
      tagList: ["征求翻译", "ACM/ICPC World Final"],
      uploader: {
        id: 472,
        username: "WinnieJt",
        email: "WinnieJt20050921@126.com",
        bio:
          "上海市世界外国语中学的蒟(dà)蒻(laǒ)——金天          备注:我的小号：https://longint.org/profiles/567                  （上海最菜蒟蒻，不服来打我。)",
        school: "上海市世界外国语中学",
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/472-1531630856424.png",
        followedCount: 7,
        solvedCount: 86,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-04 21:37",
      createdAt: "2018-09-25 21:15",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 837,
      isDelayJudge: false,
      source: "",
      serialNumber: "LNOJ-fAKe-2",
      rank: 5,
      topic: "蛋糕和甜甜圈",
      description:
        "ABC点心店里有卖$4$元一个的蛋糕和$7$元一个的甜甜圈。\n在这个情况下，判断是否存在合计金额为$N$元的购买方法。可以购买两个以上的同种商品，也可以有不购买的商品。",
      limitTime: 100,
      limitMemory: 16,
      commentCount: 1,
      isCertificate: false,
      collectCount: 0,
      submitCount: 10,
      acceptCount: 5,
      inputFormat: "输入以下面的形式从标准输入中给出。\n|$N$|\n|-|\n",
      outputFormat:
        "存在合计$N$元的购买方法的情况下输出Yes，不存在的情况下输出No。",
      dataRange: "$1$$\\leq$$N$$\\leq$$2^{10}$",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: false,
      displayTime: "2018-09-25T13:10:32.577Z",
      difficulty: 5,
      isDifficultyRight: false,
      exampleList: [
        {
          input: "11",
          output: "Yes",
          note: "购买$1$个蛋糕、$1$个甜甜圈，共计$4$$+$$7$$=$$11$元。"
        },
        {
          input: "3",
          output: "No",
          note:
            "蛋糕的价格是$4$元，甜甜圈的价格是$7$元，哪一种都超过$3$元，所以不存在符合要求的购买方法。"
        }
      ],
      acceptPercent: 50,
      tagList: [],
      uploader: {
        id: 472,
        username: "WinnieJt",
        email: "WinnieJt20050921@126.com",
        bio:
          "上海市世界外国语中学的蒟(dà)蒻(laǒ)——金天          备注:我的小号：https://longint.org/profiles/567                  （上海最菜蒟蒻，不服来打我。)",
        school: "上海市世界外国语中学",
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/472-1531630856424.png",
        followedCount: 7,
        solvedCount: 86,
        isAllowedEditAnyQuestion: false,
        isAllowedResubmitAnyQuestion: false
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    },
    {
      hasDataPoint: true,
      updatedAt: "2018-10-09 10:28",
      createdAt: "2018-09-21 17:49",
      isContest: false,
      isForked: false,
      forkedQuestionId: null,
      id: 836,
      isDelayJudge: false,
      source: "",
      serialNumber: "BZOJ-3507",
      rank: 3,
      topic: "通配符匹配",
      description:
        "常见的通配符有两个，一个是星号*，可以匹配0个及以上的任意字符：另一个是问号？，可以匹配恰好一个任意字符。\n\n给定一个包含通配符的模式，再给定一些字符串，分别判断这个模式能否匹配这些字符串。",
      limitTime: 1000,
      limitMemory: 128,
      commentCount: 0,
      isCertificate: true,
      collectCount: 0,
      submitCount: 60,
      acceptCount: 9,
      inputFormat:
        "第一行：由小写字母和通配符组成的字符串作为查询的模式。\n第二行：一个整数$n$，表示字符串个数。\n接下来$n$行：每行一个字符串。\n\n",
      outputFormat: "对于每个字符串输出YES或者NO",
      dataRange:
        "$1\\leq n\\leq 100$\n模式中出现的通配符不超过$10$个。\n字符串长度不超过$100000$",
      isAllowedFork: false,
      isShowRightCode: false,
      isShowDataPoint: true,
      displayTime: "2018-09-21T09:42:03.167Z",
      difficulty: 7,
      isDifficultyRight: true,
      exampleList: [
        {
          input:
            "*aca?ctc\n6\nacaacatctc\nacatctc\naacacatctc\naggggcaacacctc\naggggcaacatctc\naggggcaacctct",
          output: "YES\nYES\nYES\nYES\nYES\nNO",
          note: ""
        }
      ],
      acceptPercent: 15,
      tagList: [],
      uploader: {
        id: 1,
        username: "Aspirin",
        email: "admin@longint.org",
        bio: "Aspirin Code 官方账号",
        school: "上海交通大学",
        legalName: "",
        isFrozen: false,
        avatarUrl:
          "https://server.longint.org/public/avatar/1-1517247810052.jpeg",
        followedCount: 414,
        solvedCount: 59,
        isAllowedEditAnyQuestion: true,
        isAllowedResubmitAnyQuestion: true
      },
      collaboratorList: [],
      isAllowedEdit: false,
      isAllowedResubmit: false
    }
  ];
  option: GeelistOption<any> = {
    rowKey: "id",
    columnOptions: [
      { label: "编号", index: "id" },
      {
        label: "编辑认证",
        index: "isCertificate"
      },
      {
        label: "编辑认证（bool）",
        index: "isCertificate",
        bool: { yText: "已认证", nText: "社区" }
      },
      {
        label: "编号（tags）",
        index: "id",
        tags: [
          { case: 881, text: "八八一", type: "success" },
          { in: [874, 872], type: "error" },
          { in: [870, 869], text: "info", type: "info" },
          { type: "warning" }
        ]
      },
      {
        label: "题目标题",
        index: "topic",
        description: "这是这个列的简介",
        tooltip: true,
        tooltipText(row) {
          return "tooltipText " + row.id;
        }
      },
      {
        label: "题目简介",
        index: "description",
        wrap: false,
        tooltip: false
      },
      { label: "上传者", index: "uploader.username" },
      {
        label: "空值",
        index: "uploader.emptyMessage",
        emptyText: "自定义空值"
      },
      {
        label: "头像",
        description: "这是插槽的使用方法",
        index: "uploader.avatarUrl",
        slot: "avatar"
      }
    ]
  };
}
</script>

<style lang="scss">
</style>
