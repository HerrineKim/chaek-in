import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';

function SimilarBookRecomScreen({ navigation }) {
  const { accessToken, userId } = useSelector((state) => state.main);
  const [myMeetingList, setMyMeetingList] = useState([]);

  // /api/data/meeting/recent-book/{memberId} : 내가 좋아할 만한 책 추천
  useEffect(() => {
    Axios.get(`${HOST}/api/data/books/cbf/78`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response);
        setMyMeetingList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken, userId]);

  return (
    <View style={styles.container}>
      {myMeetingList ? (
        <MyMeetingView>
          {myMeetingList.map((meeting) => (
            <MyMeetingItem
              key={meeting.meetingId}
              onPress={() => navigation.navigate('MeetingDetail', { meetingId: meeting.meetingId })}
            >
              {/* <MyMeetingCoverImage source={{ uri: meeting.cover }} /> */}

              <MyMeetingTitleText>{meeting.meetingTitle}</MyMeetingTitleText>
              <MyMeetingText numberOfLines={2} elipseMode='tail'>
                {meeting.bookTitle}
              </MyMeetingText>
            </MyMeetingItem>
          ))}
        </MyMeetingView>
      ) : (
        <Text>추천할 만한 책이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyMeetingView = styled.View`
  flex; 1;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 250px;
  
`;

const MyMeetingTitleText = styled.Text`
  font-size: 18px;
  font-family: 'Medium';
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const MyMeetingText = styled.Text`
  font-size: 14px;
  font-family: 'Light';
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const MyMeetingItem = styled.Text`
  flex-direction: column;
  width: 100%;
  height: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 20px;
`;

export default SimilarBookRecomScreen;
