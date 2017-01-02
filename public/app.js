var app = new Vue({
    el: "#app",
    data: {
        docsets: [],
        loading: true,
        icons: {
            down: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADLklEQVRoQ+1XXYgNYRh+3m9mnN3StrHnKEq4Egm5YpO98VOcFModN+7dYCNnzA5LSnLjzg1REhJuxI1SLlyTKytFOT+1asnuzLyv5uhss+OcnTlmP3Zr5vLreX+e53nfb2YIC/yhBd4/cgL/28HcgdyBjArkI5RRwMzhuQOZJcyYIHcgo4CZw3MHMkuYMUEqB0oVb1DANgu2KaUWZ6yZIpxFQJ8IdNtS5sUvDv3oFJRIoGj7h4HgDqCMFJV1QN5YyhzqRGJWAn2OLCn4U2NQqk9HZ13kHK251tl2+FkJlCr+ESG52UUhLVAO5GNjdNHqrgkM2F6FADcaSMBILJGCYKMQlwHVFCTEiGADCAfisQIMAdjRxLF8EoMekuBbFBfF/D5nqbkF1TWBku05ApyLBtZcq61ry2x/P0MehdgQs8qRngkO3hFkWrnwPJLzpfph7v16hb7HG+um7uwj1IHAzAIcENS1qmudKNreYwDlFskB2y8TJDxrPlECJLLJN8QzfPUcCsuTZq+TcHNAAGDmn40Lhd7iOW8UgjNhsRWnZennS9QoViafgNS+OIGaMo2BwD9L9MdItuWijwCzL4a6Wh+xhlvNhsWKtjes2L8Hk8j36a1SqifqQGyckgxouqd1B0q2f1Ag92coLbyldr5Qbo1cJwLx5rTvwIDjDSlu3iYQggHhzYDa227WRVF5MYwX4ULXXXNNOzLRm63qWo52Au0KxG+qFiYI6EOfZayf4GBn3TWftCPQKTbN7TcnSxyfzfh8C+DUXav5/mgR8CfNfrPgHQLoxrwnEN5SJnjd1wu9Y9PuiRyvvbeuF9d6R4loZYvEvBuhaXWFn0YXmpinhOikZ1i3xh0aj7owdztQ8U4J4XLiHacZwODvDbfQ9jM+4WPOGxTCK839JaZn8LOGW9jT9XsgDChWJp+B1K7EKtoAHJCo7dXz1uu/ItDvSL/BU3cV1G5tPXZKzDxOyjhWdc0HnSCJf2StwFLF2wpgEATtv5QMBEpobMownsYXPE4kNYF/rn7KgjmBlEJpg+UOaJM2ZeLcgZRCaYPlDmiTNmXi3IGUQmmD5Q5okzZl4l9ma9BAT8xAuwAAAABJRU5ErkJggg==",
            xml:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADCUlEQVRoQ+1XP2jUcBT+3ktyUZFayvUWO+jg2OIgFC1iJ5U6CF0EEXFwLp3EwTvTSAW3QlcHixVcBAdBuosdHDtIpxZBhx5X20Gx+fN+8rsaenfeNTnT2Csky4Xc+/d938t7vxCO+EVHvH7kAA5bwVyBXIGUDOQtlJLA1O65AqkpTBkgVyAlgandcwVSU5gyQCIFSmV/TEEqonCJmU+mzJnAXZQCfSHQosXm028O/ezkFAtgsBLcAsJXABsJMmdh8slic7wTiH0B9DlqwA68NTD3ZVFZFzFnq671qJ39vgBK5eCuIrXQRaJMTCVU67XZwtmuARQrfpkAt9FRQPOs1GkQJqPnJLIJ5vkQmGRgmIAZAc4TcHPPV7YJPKeAcQBXtE10H49aVNW1uWsApYrvKOBxKwCbjYd+EKyCMbT7n5oKQ+stGd4qg49XXYv6HdVvibcO8CltoQvecC0niqlt2sXvBEbbHwgAiARiYtgIjQuK1EsAn6tsjpSUv6AU3dZJomR7Bcq2z4UzWw5tHT6AOg3yvuoWbhQrwTKBZpjkuyj1EeA6S5EC+l6roFvHY3OuhwDUm2IiZGNl08HXXSAYjSTWAIplbzowrBdm6N/TvwUJpnujhf5UKcBKzbVGSk4wqUS9aezPqL/1M1109D5UXbu/R1oI0NOo5ppTA44aosBbZeYTjQrsFirTun2iidT44h7eS6ybR2Tzl1k4Z4f+nR3DWjwmwVTjtOpUXM8AaBybgPG8daz2OoDmsfn3WK1PoXYzvlWBouOPs9QXW9PVbsEd3B4ATbSOzeaxitGkADotrU7gu19kZf+BIjyLX/XZWgjkR8212x7jYw5z/pgifMi2vPjoAlmqufb1rhXQDoPlnSUQX41Pk5WFhKT48sYTa/mfAOglZIj3msHXsiqxY1yRLWLj/oZrNi3KRvvYL7LIuFT2LwIYAyHzT0oBQla05hnGO31+2o+4xAD+O/sJE+YAEhKVmVmuQGbUJgycK5CQqMzMcgUyozZh4FyBhERlZpYrkBm1CQP/BgDrvEDRssVOAAAAAElFTkSuQmCC",
            default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADfElEQVRYR+2WX2gcVRTGv3NnsondYAOlFQWhhdRq08xuMjsbjRrXgI8trZg+1GeLFfHNB2lTjBafBVHUJ1+qSKhoqyAoJcQETfZOsjsNtIlL8KWUWjF/zIZmducembhb1nZ3ZtJU89L7es853+9+59yZS9jiRVusj/sA/4kDyVT6pGLvR8e2J8JafM8BEqlUGqBfACpS2X00l8stBkHccwCj2xohgedAOJPPZgf/VwcMyzpIjPMg/H4zFmufHR//a1MApmluKwsxqCv1rm3bq0HFBgYGtCvz844gsZ/AryvX/Yyam08txeNDv42M3GyU27AFFfELYPQT6IucnDwWBJC0rFeY8SlYzenAgbIQZ8EYAPDDUmv8UCOIugC14orVVaFp/fnJyblGAH68S+JXATzC4JccKc91mubjIHFRAA8HQdwB4BcrEX1LoOejiPtQCdMaBOEdBv/sSNlbBY0C8S+AuxE3jN5dpK8VIEQrgZ/NSTle61QYxC2Aio3fCSAT9eS+kGFaHxLhNYC/zkt5pF6bgiDWAbq6unYqrekCwD0bEU+k048pxTN+DQJ3OlLONpqTWggGj3NLy8FLY2MLZBjGLo41zwqgDZ66jiatL2jgagUSKescgBcB/jgv5YmwO+9DMIlRDdjJnvqT4w+00+5Mpu3B5dUCCd7hATeIVd8l274SVixpWb3MGINSK16TvndmYuJ6WE5XT89+r1QeJSF2MPDHCqv29Rb4ENtXVv0WPKOAa2DVHwZhpKwxAp5m8NuOlENRxJVbvghNPETg0WXmQ/O2vXRrCHdnMi3bV4rnAbwQBpFIp49A8Vd+HLlrex3HKQYB+CevigP8fXFx8XChUFj7Z3ZqVhSITCajLywXZyCwD+BX81J+crfidwBU2hHohGFaJ4jwEYMv79uzp3N4eNhrBBB08mpO3U9xIyc6Ojpa9VhLodLHwzkpv9mMeF0HqgVrIZjwuZPNvpwwrSEQToPwUz6b7QuyvtM0vxQkjt7e89tzAh8k6xDF4sltuv6e67ptZdLmAI4zq6fCnluVH9pbxYWFM9WBqwcc+UWUSFn+sB0HYTifzR4Nu3ZR9yMBdHc/+UQJJUcIoTTldUxNTRWiCoTFRQIwLOssMY4B/EFeyjfCim5kPxJAMplsgx57k7zS+9PT0zc2IhAWGwkgrMhm9u8DbLkDfwMkIO59on7BbgAAAABJRU5ErkJggg=="
        },
        filter: ""
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

    },
    computed: {
        cdocsets: function () {
            if(this.filter) {
                let obj = {};
                Object.keys(this.docsets)
                    .filter((key) => {
                        return this.docsets[key].name.toLowerCase().includes(this.filter.toLowerCase());
                    })
                    .map((key) => {
                        obj[key] = this.docsets[key];
                    });
                return obj;
            }
            else{
                return this.docsets;
            }
        }
    }
});