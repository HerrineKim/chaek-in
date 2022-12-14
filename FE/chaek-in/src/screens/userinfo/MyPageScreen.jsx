import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Axios from 'axios';
import { HOST } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setEmail, setNickname, setRefreshToken, setUserId } from '../../redux/actions';
import BookItem from '../../components/common/BookItem';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function MyPageScreen({ navigation }) {
  const { accessToken, nickname } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [readingBooks, setReadingBooks] = useState([]);
  const [menuDisplay, setMenuDisplay] = useState(false);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        setJob(response.data.job);
        setAge(response.data.age);
        setGender(response.data.gender);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${HOST}/api/v1/books/me?isReading=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setReadingBooks(response.data.books);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Logout = async () => {
    // await GoogleSignin.revokeAccess();
    // await auth().signOut();
    dispatch(setNickname(''));
    dispatch(setEmail(''));
    dispatch(setRefreshToken(''));
    dispatch(setUserId(''));
    dispatch(setAccessToken(''));
    Alert.alert('???????????????????????????.');
  };

  const quit = () => {
    Axios.delete(`${HOST}/api/v1/members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async function () {
        // await GoogleSignin.revokeAccess();
        // await auth().signOut();
        dispatch(setNickname(''));
        dispatch(setEmail(''));
        dispatch(setRefreshToken(''));
        dispatch(setUserId(''));
        dispatch(setAccessToken(''));
        Alert.alert('?????????????????????.');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changePress = () => {
    navigation.navigate('ChangeUserinfo', { nickname: nickname, job: job, age: age, gender: gender });
  };

  const logoutPress = () => {
    Alert.alert('???????????????????????????????', '', [
      { text: '?????????', style: 'cancel' },
      { text: '???', onPress: Logout },
    ]);
  };
  const quitPress = () => {
    Alert.alert('?????????????????????????', '', [
      { text: '?????????', style: 'cancel' },
      { text: '???', onPress: quit },
    ]);
  };

  const goLibrary = () => {
    navigation.navigate('MyLibrary');
  };

  const goBookDetail = (bookNumber) => {
    navigation.navigate('BookDetail', { bookId: bookNumber });
  };

  const openMenu = () => {
    setMenuDisplay(true);
  };

  const closeMenu = () => {
    setMenuDisplay(false);
  };

  return (
    <ScrollView>
      <MyPageContainer>
        <TitleText>?????? ???????????? ???</TitleText>
        <BookItemsContainer>
          {readingBooks.map((book) => (
            <TouchableOpacity key={book.bookId} onPress={() => goBookDetail(book.bookId)}>
              <BookItem item={book} />
            </TouchableOpacity>
          ))}
        </BookItemsContainer>
        <NextButton onPress={goLibrary}>
          <ButtonContainer>
            <ButtonText>??? ??????</ButtonText>
            <MaterialIcons name='navigate-next' size={20} color='grey' />
          </ButtonContainer>
        </NextButton>
        <UserinfoContainer>
          <MenuButtonContainer onPress={openMenu}>
            <Entypo name='dots-three-vertical' size={24} color='black' />
          </MenuButtonContainer>
          <Modal
            animationType='slide'
            transparent={true}
            visible={menuDisplay}
            onRequestClose={() => {
              closeMenu();
            }}
            onBackdropPress={() => closeMenu()}
          >
            <MenuOverLay onPress={closeMenu}>
              <SettingMenuContainer>
                <MenuSelectContainer onPress={changePress}>
                  <MenuText>??????????????????</MenuText>
                </MenuSelectContainer>
                <MenuSelectContainer onPress={logoutPress}>
                  <MenuText>????????????</MenuText>
                </MenuSelectContainer>
                <MenuSelectContainer onPress={quitPress}>
                  <MenuText>????????????</MenuText>
                </MenuSelectContainer>
              </SettingMenuContainer>
              <CancelContainer>
                <MenuSelectContainer onPress={closeMenu}>
                  <MenuText>??????</MenuText>
                </MenuSelectContainer>
              </CancelContainer>
            </MenuOverLay>
          </Modal>
          <UserinfoLineContainer>
            <KeyContainer>
              <KeyText>?????????</KeyText>
            </KeyContainer>
            <ValueContainer>
              <ValueText>{nickname}</ValueText>
            </ValueContainer>
          </UserinfoLineContainer>
          <UserinfoLineContainer>
            <KeyContainer>
              <KeyText>??????</KeyText>
            </KeyContainer>
            <ValueContainer>
              <ValueText>{gender === 'MALE' ? '??????' : '??????'}</ValueText>
            </ValueContainer>
          </UserinfoLineContainer>
          <UserinfoLineContainer>
            <KeyContainer>
              <KeyText>??????</KeyText>
            </KeyContainer>
            <ValueContainer>
              <ValueText>{2022 - Number(age)}</ValueText>
            </ValueContainer>
          </UserinfoLineContainer>
          <UserinfoLineContainer>
            <KeyContainer>
              <KeyText>??????</KeyText>
            </KeyContainer>
            <ValueContainer>
              <ValueText>{job}</ValueText>
            </ValueContainer>
          </UserinfoLineContainer>
        </UserinfoContainer>
      </MyPageContainer>
    </ScrollView>
  );
}

const MyPageContainer = styled.View`
  background-color: #fcf9f0;
  flex: 1;
`;

const TitleText = styled.Text`
  font-family: Light;
  font-size: 18px;
  margin-left: 8%;
`;

const BookItemsContainer = styled.View`
  margin-top: 5%;
  margin-left: 4%
  display:flex
  flex-flow: row wrap;
`;

const NextButton = styled.TouchableOpacity`
  margin-top: 15%;
  width: 80%;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  margin-bottom: 1px;
  font-family: Light;
`;

const ButtonContainer = styled.View`
  margin-left: 10%
  display: flex;
  flex-flow: row wrap;
`;

const UserinfoContainer = styled.View`
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  margin-top: 10%;
  border: 1px solid #000;
  border-radius: 20px;
`;

const UserinfoLineContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5%;
`;

const MenuButtonContainer = styled.TouchableOpacity`
  margin: 5% 0% 5% 85%;
`;

const KeyContainer = styled.View`
  width: 50%;
`;

const KeyText = styled.Text`
  font-family: Light;
  font-size: 18px;
  margin-left: auto;
  margin-right: 3%;
`;

const ValueContainer = styled.View`
  width: 50%
  margin-right: auto;
  margin-left: 3%;
`;

const ValueText = styled.Text`
  font-family: Medium;
  font-size: 18px;
`;

const SettingMenuContainer = styled.View`
  margin-top: 400px;
  width: 80%;
  background-color: #fcf9f0;
  border-radius: 15px;
  border: 1px solid #000;
  align-items: center;
  margin-bottom: 2%;
`;

const CancelContainer = styled.View`
  width: 80%
  background-color: #fcf9f0;
  border-radius: 15px;
  border: 1px solid #000;
  align-items: center;
`;

const MenuSelectContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #fcf9f0;
  align-items: center;
  margin: 5%;
`;

const MenuText = styled.Text`
  font-family: Medium;
  font-size: 18px;
`;

const MenuOverLay = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: rgba(102, 100, 100, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyPageScreen;
