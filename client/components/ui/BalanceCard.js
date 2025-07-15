import { Text, View } from '../Themed';
import { formatCurrency } from '../FormatNumber';

const BalanceCard = ({ summary }) => {
  return (
    <View
      className="w-full bg-blue p-4 rounded-lg flex items-start justify-between"
      style={{ marginTop: 10, height: 200, elevation: 4 }}
    >
      <Text type="subtitle2" className="text-text ">
        Total Balance:
      </Text>
      <Text type="big" className="my-6 text-text ">
        {summary?.balance === undefined
          ? formatCurrency(0)
          : formatCurrency(summary?.balance)}
      </Text>

      <View className="w-full  flex-row items-center justify-between gap-2">
        <View className=" w-[50%] items-center bg-white p-2 rounded">
          <Text type="subtitle">Income</Text>
          <Text type="subtitle2">
            {' '}
            {summary?.income === undefined
              ? formatCurrency(0)
              : formatCurrency(summary?.income)}
          </Text>
        </View>
        <View className="w-[50%]  items-center bg-yellow p-2 rounded">
          <Text type="subtitle">Expense</Text>
          <Text type="subtitle2">
            {' '}
            {summary?.expense === undefined
              ? formatCurrency(0)
              : formatCurrency(summary?.expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
