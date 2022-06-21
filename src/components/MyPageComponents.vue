<script>
import { getDoc, doc } from "@/firebase/firestore"
import { db } from "/firebase"

export default {
  props: ["uId"],
  data() {
    return {
      UserName: "",
      myUniversities: [],
      favShops: {},
    }
  },
  async created() {
    const userDataGet = await getDoc(doc(db, "users", this.uId))
    const userData = userDataGet.data()
    this.Username = userData.nickName
    this.myUniversities = userData.myUniversity
    this.favShops = userData.starPost
  },
}
</script>
