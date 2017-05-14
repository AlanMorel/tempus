Vue.component('builder', {
    props: ['source'],
    template: '#builder-template',
    data: () => ({
        data: {},
        output: ""
    }),
    created() {
        axios.get(this.source).then(response => {
            this.data = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })
    },
    methods: {
        add: function() {
            this.data.events.push({
                "date": "1990-01-01",
                "headline": "Enter headline",
                "image": "/assets/images/",
                "description": "Enter description"
            });
        },
        delete: function(index) {
            this.data.events.splice(index, 1);
        },
        save: function() {

            console.log("SAVING");

            if (this.data.events && this.data.events.length){
                this.data.events.sort(function(a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
            }

            this.output = JSON.stringify(this.data);
        },
        load: function() {

            console.log("LOADING");

            if (this.output.length < 1){
                this.data = {};
                return;
            }

            this.data = JSON.parse(this.output);
        }
    },
});

new Vue({
  el: '#builder-app',
});
