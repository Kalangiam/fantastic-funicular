<template>
  <div class="CallToActions">
    <InputsPopup
      v-if="showInputsPopup"
      :translate-lang="translateLang"
      :page="inputsPopupPage"
      @closePopup="openCloseInputsPopup"
    />
    <div class="CallToActions__title">How can we serve you?</div>
    <!--<RequestCoach
      class="CallToActions__RequestCoach"
      :translate-lang="translateLang"
      @openPopup="openCloseInputsPopup"
    />-->
    <div class="CallToActions__Cards">
      <template v-for="(item, index) in items">
        <Card
          :key="`item-${index}`"
          class="CallToActions__Card"
          :index="index"
          v-bind="item"
          @click.native="openPopup(item)"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "CallToActions",

  components: {
    Card: () => import("~/components/Card"),
    // RequestCoach: () => import("~/components/RequestCoach"),
    InputsPopup: () => import("~/components/InputsPopup"),
  },

  props: {
    translateLang: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      inputsPopupPage: "",
      showInputsPopup: false,
      pray: {
        id: "prayRequest",
        icon: "pray-hands",
        type: "pray",
        title: "Pray for me",
        desc:
          "God loves to answer prayers! Leave your request and we will pray for you.",
        question: "Where do you want to receive your answer?",
        placeholder: "Please enter your prayer request",
        btnText: "Submit",
        hubspotId: "dbbaeef5-a7d6-4fa4-a68b-df392dd26bdd",
      },
      bible: {
        id: "bibleStudy",
        hubspotId: "514e1b13-68b0-4cd6-8323-fdae0ff1c6eb",
        href: "https://bibleschools.com/1505",
      },
      question: {
        id: "askQuestion",
        icon: "answers",
        type: "question",
        title: "Ask a Bible question",
        desc: "Submit a Bible question and we will help you find the answer",
        question: "Where do you want to receive your answer?",
        placeholder: "Please enter your question",
        btnText: "Submit",
        hubspotId: "d4b36332-b4c7-400a-8d91-910b4a8fb037",
      },
    };
  },

  computed: {
    items() {
      return [
        {
          id: "pray",
          icon: "pray-hands",
          title: "Pray for me",
          desc:
            "God loves to answer prayer. Leave your request and we will pray for you.",
        },
        {
          id: "bible",
          icon: "bible-closed",
          title: "Start Bible study",
          desc: "Find guidance for today in God's Word.",
        },
        {
          id: "question",
          icon: "answers",
          title: "Ask a Bible question",
          desc: "Submit a Bible question and we will help you find the answer",
        },
      ];
    },
  },

  methods: {
    openCloseInputsPopup(val) {
      if (val) this.inputsPopupPage = val;
      this.showInputsPopup = !this.showInputsPopup;
    },

    openPopup(item) {
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
.CallToActions {
  max-width: 1150px;
  width: 100%;
  margin: 70px auto;
  padding: 0 20px;
}

.CallToActions__title {
  font-family: Kanit;
  padding: 0 30px;
  margin-bottom: 40px;
  line-height: 44px;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  text-align: center;
  color: #0267b5;
}

.CallToActions__Cards {
  display: flex;
  flex-wrap: wrap;
}

.CallToActions__Card {
  margin-top: 20px;
}

.CallToActions__Card:not(:last-child) {
  margin-right: 20px;
}

@media (max-width: 824px) {
  .CallToActions__Card:not(:last-child) {
    margin-right: 0;
  }

  .CallToActions__Card:first-child {
    margin-right: 20px;
  }
}

@media (max-width: 549px) {
  .CallToActions__Card:first-child {
    margin-right: 0;
  }
}
</style>
