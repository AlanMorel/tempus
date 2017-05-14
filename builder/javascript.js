Vue.component('builder', {
    props: ['source'],
    template: '#builder-template',
    data: () => ({
        data: {}
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
        timelineStyles: function() {
            return "background-color:" + this.data.info.background + "; color:" + this.data.info.color + ";";
        },
        detailsStyles: function() {
            return "background-color:" + this.data.info.detailsBackground + "; color:" + this.data.info.detailsColor + ";";
        },
        lineStyles: function() {
            return "background-color:" + this.data.info.lineColor + ";";
        }
    },
});

new Vue({
  el: '#builder-app',
});
