// 📄 src/data/photoData.js
// 사진 갤러리 데이터 관리

// 실제 사진 데이터 (현재 업로드된 사진들 기반)
export const photoCollections = [
  {
    id: "2024-07-27",
    title: "7월 마지막 주말 나들이",
    date: "2024.07.27",
    location: "서울 근교",
    description: "날씨가 너무 좋아서 오랜만에 카메라를 들고 나갔습니다. 평범한 일상이지만 소중한 순간들을 담아봤어요.",
    images: [
      {
        filename: "TalkMedia_i_56f6ee369694.jpg.jpg",
        caption: "골목길에서 만난 고양이"
      },
      {
        filename: "TalkMedia_i_6f6cd85ebf2d 2.jpg.jpg", 
        caption: "오후 햇살이 예쁜 카페"
      }
    ],
    tags: {
      location: ["서울", "근교", "골목길"],
      theme: ["일상", "동물", "카페"],
      season: ["여름"],
      mood: ["평온", "감성", "따뜻함"],
      time: ["오후", "주말"]
    },
    featured: true, // 메인 슬라이드 포함
    likes: 12,
    comments: [
      {
        id: 1,
        author: "김친구",
        content: "고양이가 너무 귀여워요!",
        date: "2024.07.28"
      }
    ]
  },
  {
    id: "2024-07-13",
    title: "여름 중반의 특별한 하루",
    date: "2024.07.13",
    location: "한강공원",
    description: "더위를 피해 한강으로 나왔습니다. 시원한 바람과 함께 여유로운 시간을 보냈어요.",
    images: [
      {
        filename: "TalkMedia_i_a71e2379695c.jpg.jpg",
        caption: "한강에서 바라본 일몰"
      },
      {
        filename: "TalkMedia_i_a9eaf0936d2f.jpg.jpg",
        caption: "강변 산책로"
      }
    ],
    tags: {
      location: ["서울", "한강", "강변"],
      theme: ["자연", "일몰", "산책"],
      season: ["여름"],
      mood: ["시원함", "여유", "평화"],
      time: ["저녁", "골든아워"]
    },
    featured: true,
    likes: 18,
    comments: []
  },
  {
    id: "2024-06-29",
    title: "6월의 마지막 기록",
    date: "2024.06.29",
    location: "동네 근처",
    description: "6월이 끝나가는 아쉬움을 담아 동네를 한 바퀴 돌았습니다. 익숙한 풍경도 카메라로 보면 새롭네요.",
    images: [
      {
        filename: "TalkMedia_i_ce4bb7d3df2f.jpg.jpg",
        caption: "동네 골목의 평범한 풍경"
      },
      {
        filename: "TalkMedia_i_fa21422cdbec.jpg.jpg",
        caption: "작은 공원의 벤치"
      }
    ],
    tags: {
      location: ["동네", "골목", "공원"],
      theme: ["일상", "동네", "평범함"],
      season: ["여름초"],
      mood: ["그리움", "익숙함", "소중함"],
      time: ["오후"]
    },
    featured: false,
    likes: 8,
    comments: []
  }
];

// 태그별 필터링 함수들
export const filterByTag = (collections, tagType, tagValue) => {
  return collections.filter(collection => 
    collection.tags[tagType]?.includes(tagValue)
  );
};

export const filterByMultipleTags = (collections, filters) => {
  return collections.filter(collection => {
    return Object.entries(filters).every(([tagType, tagValues]) => {
      if (!tagValues || tagValues.length === 0) return true;
      return tagValues.some(value => collection.tags[tagType]?.includes(value));
    });
  });
};

// 메인 슬라이드용 featured 사진들
export const getFeaturedCollections = () => {
  return photoCollections.filter(collection => collection.featured);
};

// 모든 태그 추출 (검색 필터용)
export const getAllTags = () => {
  const allTags = {
    location: new Set(),
    theme: new Set(), 
    season: new Set(),
    mood: new Set(),
    time: new Set()
  };

  photoCollections.forEach(collection => {
    Object.entries(collection.tags).forEach(([tagType, tags]) => {
      tags.forEach(tag => allTags[tagType].add(tag));
    });
  });

  // Set을 Array로 변환
  return Object.fromEntries(
    Object.entries(allTags).map(([key, set]) => [key, Array.from(set)])
  );
};