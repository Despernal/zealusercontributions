var app = new Vue({
    el: "#app",
    data: {
        docsets: [],
        loading: true
    },
    mounted: function () {
        axios
            .get(`index.json`)
            .then((data) => {
                this.docsets = data.data.docsets;
                this.loading = false;
            })
            .catch((err)=>{
                console.error(err);
            });
    }
});