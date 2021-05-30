<template>
  <div>
    <b-modal
      :id="'addResponse' + data.id"
      ref="modal"
      :title="'Ответ на запрос пользователя #' + data.user_id"
      @ok="handleOk"
      @hidden="resetModal"
      @show="resetModal"
      ok-title="Отправить"
      cancel-title="Отменить"
    >
      <!-- <form ref="form" @submit.stop.prevent="handleSubmit"> -->
      <form ref="form">
        <b-form-group
          label="Название запроса"
          label-for="title-input"
        >
        <b-form-input
            id="title-input"
            :value="data.title"
            disabled
        ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Текст ответа"
          label-for="question-input"
          invalid-feedback="Введите текст ответа"
          :state="state.response"
        >
        <b-form-textarea
            id="question-input"
            v-model="form.response"
            placeholder="Текст ответа"
            rows="8"
            max-rows="15"
            required
        ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {
          form: {
            response: '',
          },
          state: {
              response: true,
          }
      }
    },
    methods: {
      resetModal() {
          Object.keys(this.form).forEach(key => {
              this.form[key] = '';
              this.state[key] = true;
          });
      },
      isValidForm() {
        let valid = true;
        Object.keys(this.form).forEach(key => {
            this.state[key] = this.form[key].length > 0;
            if (this.form[key].length < 1) {
                valid = false;
            }
        });
        return valid;
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
          if (!this.isValidForm()) {
              return;
          }

        this.addResponse();

        this.$nextTick(() => {
          this.$refs["modal"].hide();
        })
        // this.$refs["modal"].hide();
        this.resetModal();
      },
      addResponse() {
          let data = {
              'answer': this.form.response,
              'request_id': this.data.id
          }
          this.$store.dispatch('addResponse', data).then(response => {
              console.log(response);
          }, error => {
              console.log(error);
          })
      }
    }
  }
</script>