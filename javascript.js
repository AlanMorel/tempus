Vue.component('timeline', {
    props: ['source'],
    template: '#timeline-template',
    data: () => ({
        data: {}
    }),
    created() {
        axios.get(this.source).then(response => {
            this.data = response.data
            console.log(this.data);
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
});

new Vue({
  el: '#timeline-app',
});
