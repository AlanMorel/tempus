Vue.component('builder', {
    props: ['source'],
    template: '#builder-template',
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
    },
    methods: {
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
