<template>
  <div>
    <b-modal
      id="modal-user-request"
      ref="modal"
      title="Новый запрос"
      @ok="handleOk"
      @hidden="resetModal"
      @show="resetModal"
      cancel-title="Отменить"
      ok-title="Отправить"
    >
      <!-- <form ref="form" @submit.stop.prevent="handleSubmit"> -->
      <form ref="form">
        <b-form-group
          label="Название запроса"
          label-for="title-input"
          invalid-feedback="Введите тему запроса"
          :state="state.title"
        >
        <b-form-input
            id="title-input"
            v-model="form.title"
            required
        ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Текст запроса"
          label-for="question-input"
          invalid-feedback="Введите текст запроса"
          :state="state.question"
        >
        <b-form-textarea
            id="question-input"
            v-model="form.question"
            placeholder="Текст запроса"
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
    data() {
      return {
          form: {
            title: '',
            question: '',
          },
          state: {
              title: true,
              question: true,
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

        this.addNewRequest(this.form);

        this.$nextTick(() => {
          this.$refs["modal"].hide();
        })
        this.resetModal();
      },
      addNewRequest(data) {
        this.$store.dispatch('addNewUserRequest', data).then(response => {
            console.log(response);
            // this.requests = response.data;
        }, error => {
            console.log(error)
        })
      },
    }
  }
</script>