const encodedConfig = "ewogICJhcGlLZXkiOiAiQUl6YVN5Q093UVM0c21DRmp1RlBBdHRvR1BfUmZjc3kwaHg2LTdrIiwKICAiYXV0aERvbWFpbiI6ICJwZXJzb25hbC1wb3J0Zm9saW8tODRkNDguZmlyZWJhc2VhcHAuY29tIiwKICAicHJvamVjdElkIjogInBlcnNvbmFsLXBvcnRmb2xpby04NGQ0OCIsCiAgInN0b3JhZ2VCdWNrZXQiOiAicGVyc29uYWwtcG9ydGZvbGlvLTg0ZDQ4LmZpcmViYXNlc3RvcmFnZS5hcHAiLAogICJtZXNzYWdpbmdTZW5kZXJJZCI6ICIxMTc1NTE4NzIxMjEiLAogICJhcHBJZCI6ICIxOjExNzU1MTg3MjEyMTp3ZWI6MWI5YWE3N2FkNWQ3MDMzYmFkM2NhOCIKfQo=";
const decodedConfig = atob(encodedConfig);
const firebaseConfig = JSON.parse(decodedConfig);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default{
    getVisit :(callback)=>{
        db.collection("stats").doc("visits").onSnapshot((doc) => {
            callback(doc.data());
        });
    },
    cntUpdate: (col, docId, field = "clicks") => {
        const ref = db.collection(col).doc(docId);
    
        // visits일 때만 날짜 체크해서 분기 처리
        if (col === "stats" && docId === "visits") {
          const todayKey = new Date().toISOString().slice(0, 10);
          const visitKey = "visited-" + todayKey;
          
        //   사용자 구별(daily)
          if (localStorage.getItem(visitKey)) return;
          localStorage.setItem(visitKey, "true");
          
          ref.get().then((docSnap) => {
            if (docSnap.exists) {
              const data = docSnap.data();
    
              if (data.todayDate === todayKey) {
                ref.update({
                  total: firebase.firestore.FieldValue.increment(1),
                  today: firebase.firestore.FieldValue.increment(1)
                });
              } else {
                ref.update({
                  total: firebase.firestore.FieldValue.increment(1),
                  today: 1,
                  todayDate: todayKey
                });
              }
            } else {
              ref.set({
                total: 1,
                today: 1,
                todayDate: todayKey
              });
            }
          });
        } else {
          // 일반 클릭수 증가
          ref.get().then((docSnap) => {
            if (docSnap.exists) {
              ref.update({
                [field]: firebase.firestore.FieldValue.increment(1)
              });
            } else {
              ref.set({ [field]: 1 });
            }
          });
        }
    },
    ranking: async (limitCount = 3) => {
        const snapshot = await db
          .collection("projects")
          .orderBy("clicks", "desc")   // 클릭수 기준 내림차순 정렬
          .limit(limitCount)           // 상위 n개만 가져오기
          .get();
      
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data()
          });
        });
      
        return result;
      }
}




