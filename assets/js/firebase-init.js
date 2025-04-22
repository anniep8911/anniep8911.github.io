const encodedConfig = "ewogICJhcGlLZXkiOiAiQUl6YVN5Q093UVM0c21DRmp1RlBBdHRvR1BfUmZjc3kwaHg2LTdrIiwKICAiYXV0aERvbWFpbiI6ICJwZXJzb25hbC1wb3J0Zm9saW8tODRkNDguZmlyZWJhc2VhcHAuY29tIiwKICAicHJvamVjdElkIjogInBlcnNvbmFsLXBvcnRmb2xpby04NGQ0OCIsCiAgInN0b3JhZ2VCdWNrZXQiOiAicGVyc29uYWwtcG9ydGZvbGlvLTg0ZDQ4LmZpcmViYXNlc3RvcmFnZS5hcHAiLAogICJtZXNzYWdpbmdTZW5kZXJJZCI6ICIxMTc1NTE4NzIxMjEiLAogICJhcHBJZCI6ICIxOjExNzU1MTg3MjEyMTp3ZWI6MWI5YWE3N2FkNWQ3MDMzYmFkM2NhOCIKfQo=";
const decodedConfig = atob(encodedConfig);
const firebaseConfig = JSON.parse(decodedConfig);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let unsubscribeRanking = null;

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
          // 한국기준 시간 만들기 
          const now = new Date();
          const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000); // KST 보정

          const year = kstNow.getUTCFullYear();
          const month = String(kstNow.getUTCMonth() + 1).padStart(2, '0');
          const day = String(kstNow.getUTCDate()).padStart(2, '0');

          const todayKey = `${year}-${month}-${day}`;

          
        //   사용자 구별(daily)
          if (localStorage.getItem(todayKey)) return;
          localStorage.setItem(todayKey, "true");
          
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
    startRanking : (cnt, callback) => {
      if (unsubscribeRanking) return; // 중복 방지
    
      unsubscribeRanking = db
        .collection("projects")
        .orderBy("clicks", "desc")
        .limit(cnt)
        .onSnapshot(snapshot => {
          const result = [];
          snapshot.forEach(doc => {
            result.push({
              id: doc.id,
              ...doc.data()
            });
          });
          callback(result);
        });
    },
    stopRanking : () => {
      if (unsubscribeRanking) {
        unsubscribeRanking();
        unsubscribeRanking = null;
      }
    }
    // ranking:(cnt, callback) => {
    //   return db
    //     .collection("projects")
    //     .orderBy("clicks", "desc")
    //     .limit(cnt)
    //     .onSnapshot(snapshot => {
    //       const result = [];
    //       snapshot.forEach(doc => {
    //         result.push({
    //           id: doc.id,
    //           ...doc.data()
    //         });
    //       });
    //       callback(result); // 결과를 콜백으로 넘김
    //     });
    // }
}




