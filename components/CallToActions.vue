<template>
  <div class="CallToActions">
    <div class="CallToActions__header">
      <div class="CallToActions__title">
        {{ getContent("call_to_actions.label") }}
      </div>
      <div class="CallToActions__subtitle">
        {{ getContent("call_to_actions.description") }}
      </div>
    </div>
    <div class="wrap">
      <div class="CallToActions__Cards">
        <template v-for="(item, index) in items">
          <Card
            :key="`item-${index}`"
            :index="index"
            v-bind="item"
            @click.native="openPopup(item)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CallToActions",

  components: {
    Card: () => import("~/components/Card"),
  },

  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      pray: {
        id: "prayRequest",
        icon: "pray-hands",
        type: "pray",
        title: "call_to_actions.pray.title",
        desc: "call_to_actions.pray.desc",
        question: "call_to_actions.pray.where_you_want_rece",
        placeholder: "call_to_actions.placeholder_pray",
        btnText: "call_to_actions.btn_text_1",
        // hubspotId: '920f5366-8d6d-4e83-b881-71d75f603735',
        hubspotId: "",
        success: {
          title: "call_to_actions.success.title_1",
          desc: "call_to_actions.success.desc_1",
        },
      },
      bible: {
        id: "bibleStudy",
        hubspotId: "514e1b13-68b0-4cd6-8323-fdae0ff1c6eb",
        title: "call_to_actions.success.title_2",
        desc: "call_to_actions.success.desc_2",
        href: "",
      },
      question: {
        id: "askQuestion",
        icon: "answers",
        type: "question",
        title: "call_to_actions.question.title",
        desc: "call_to_actions.question.desc",
        question: "call_to_actions.pray.where_you_want_rece",
        placeholder: "call_to_actions.placeholder_question",
        btnText: "call_to_actions.btn_text_1",
        // hubspotId: 'bf88e843-7979-4413-bc0e-6be79c0e6629',
        hubspotId: "",
        success: {
          title: "call_to_actions.success.title_4",
          desc: "call_to_actions.success.title_3",
        },
      },
    };
  },

  computed: {
    items() {
      return [
        {
          id: "pray",
          icon: "pray-hands",
          title: this.getContent("call_to_actions.pray.title"),
          desc: this.getContent("call_to_actions.pray.desc"),
        },
        {
          id: "bible",
          icon: "bible-closed",
          title: this.getContent("call_to_actions.bible.title"),
          desc: this.getContent("call_to_actions.bible.desc"),
        },
        {
          id: "question",
          icon: "answers",
          title: this.getContent("call_to_actions.question.title"),
          desc: this.getContent("call_to_actions.question.desc"),
        },
      ];
    },
  },

  methods: {
    getContent(key) {
      const content = this.translateLang.find((item) => item.langKey === key);
      return content ? content.value : key;
    },

    openPopup(item) {
      if (localStorage.lang === "spa") {
        this.pray.hubspotId = "1184c162-8034-467c-9c54-2b86e4142614";
        this.question.hubspotId = "e5f892d9-4549-44d6-a7e9-7e4ef17c6a2f";
        this.bible.href =
          "https://bibleschools.com/courses/6/lessons/71/steps/387?locale=es";
      } else {
        this.pray.hubspotId = "dbbaeef5-a7d6-4fa4-a68b-df392dd26bdd";
        this.question.hubspotId = "d4b36332-b4c7-400a-8d91-910b4a8fb037";
        this.bible.href = "https://bibleschools.com/1505";
      }

      if (item.id === "pray") {
        this.$emit("show-popup", this.pray);
      } else if (item.id === "bible") {
        window.open(this.bible.href, "_blank");
      } else if (item.id === "question") {
        this.$emit("show-popup", this.question);
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  max-width: 1140px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.CallToActions__header {
  @apply text-center my-10;
}
.CallToActions__title {
  color: #0f46c1;
  padding: 0 30px;
  font-family: Kanit, serif;
  font-size: 40px;
  line-height: 44px;
  @apply font-light;
}
.CallToActions__subtitle {
  font-family: Roboto;
  font-size: 15px;
  line-height: 23px;
  padding: 0 30px;
  @apply text-center text-black text-opacity-50;
}

.CallToActions__Cards {
  grid-column: 2 / 12;
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
}
</style>
