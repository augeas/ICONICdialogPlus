
import { StyleSheet, Text, Pressable, View } from 'react-native';

enum Months {
  Jan = 0,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
};

const formatTime = (d: Date) => {
  let minStr = (d.getUTCMinutes() < 10) ? '0' + d.getUTCMinutes() : d.getUTCMinutes();  
  return (d.getUTCHours() + ':' + minStr)
}

type SessionDateProps = {
  timeStamp: string,
  onPress: () => void;
}

function SessionDate({timeStamp, onPress=() => {}}: SessionDateProps) {
  const dt = new Date(timeStamp);

  return (
    <Pressable style={dateStyles.calendarContainer} onPress={onPress}>
      <View style={dateStyles.calendarPage}>
        <Text style={dateStyles.monthHeader}>{Months[dt.getMonth()]}</Text>
        <Text style={dateStyles.date}>{dt.getUTCDate()}</Text>
      </View>
      <Text style={dateStyles.time}>{formatTime(dt)}</Text>
    </Pressable>
  )    
}

const dateStyles = StyleSheet.create({
  calendarContainer: {
    padding: 6,
  },
  calendarPage: {
    backgroundColor: '#FFFFFF',
    borderColor: "#000000",
    borderWidth: 1,
  },
  monthHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: 'red',
    padding: 4,
  },
  date: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  time: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',    
  },
});

export default SessionDate;
