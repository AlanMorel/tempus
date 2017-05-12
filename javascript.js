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

Vue.component('date', {
    props: ['value'],
    template: '#date-template',
    methods: {
        formatDate: function (value) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 'timeZone': 'UTC' };
            return new Date(value).toLocaleDateString('en-US', options);
        }
    }
});

new Vue({
  el: '#timeline-app',
});
