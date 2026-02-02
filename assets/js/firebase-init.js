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

  // KST 기준 todayKey 만들기 함수
  const getTodayKey = () => {
    const now = new Date();
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const year = kstNow.getUTCFullYear();
    const month = String(kstNow.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstNow.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 방문자
  if (col === "stats" && docId === "visits") {
    const todayKey = getTodayKey();
    const lsKey = `visits:${todayKey}`;

    if (localStorage.getItem(lsKey)) return;

    ref.get().then((docSnap) => {
      if (docSnap.exists) {
        const data = docSnap.data();

        const p = (data.todayDate === todayKey)
          ? ref.update({
              total: firebase.firestore.FieldValue.increment(1),
              today: firebase.firestore.FieldValue.increment(1),
            })
          : ref.update({
              total: firebase.firestore.FieldValue.increment(1),
              today: 1,
              todayDate: todayKey,
            });

        // 성공 후에만 저장
        p.then(() => localStorage.setItem(lsKey, "true"))
         .catch((err) => console.error("[visits update FAIL]", err));
      } else {
        ref.set({
          total: 1,
          today: 1,
          todayDate: todayKey,
        })
          .then(() => localStorage.setItem(lsKey, "true"))
          .catch((err) => console.error("[visits set FAIL]", err));
      }
    });

    return;
  }

  // 프로젝트 클릭수(조회수) - 사람(브라우저)별 하루 1회만
  if (col === "projects") {
    const todayKey = getTodayKey();
    const lsKey = `click:${docId}:${todayKey}`; // 프로젝트별 + 날짜별

    if (localStorage.getItem(lsKey)) return;

    // 문서 있든 없든 merge+increment로 처리하는 게 안전하지만
    // 네 기존 스타일 유지하려면 get->update/set도 가능
    ref.get().then((docSnap) => {
      const p = docSnap.exists
        ? ref.update({ [field]: firebase.firestore.FieldValue.increment(1) })
        : ref.set({ [field]: 1 }, { merge: true });

      p.then(() => localStorage.setItem(lsKey, "true"))
       .catch((err) => console.error("[project click update FAIL]", err));
    });

    return;
  }

  // 기타 컬렉션 기본 동작(매번 증가)
  ref.get().then((docSnap) => {
    if (docSnap.exists) {
      ref.update({
        [field]: firebase.firestore.FieldValue.increment(1),
      }).catch((err) => console.error("[cntUpdate update FAIL]", err));
    } else {
      ref.set({ [field]: 1 }, { merge: true })
        .catch((err) => console.error("[cntUpdate set FAIL]", err));
    }
  });
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




