import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text, View } from '../Themed';
import { formatDate } from '../formatDate';
import { formatCurrency } from '../FormatNumber';

const CategoryIcon = {
  'Food & Drinks': 'fast-food',
  Shopping: 'cart',
  Transportation: 'car',
  Entertainment: 'film',
  Bills: 'receipt',
  Income: 'cash',
  Other: 'ellipsis-horizontal',
};

const Transactions = ({ item, onDelete }) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CategoryIcon[item.category] || 'pricetag-outline';

  return (
    <View className="bg-white rounded-md mb-3 flex-row items-center elevation-md gap-2 h-[90]">
      <TouchableOpacity className="flex-1 flex-row px-2 items-center">
        <View>
          <Ionicons name={iconName} size={24} color="#333333" />
        </View>
        <View className="flex-1 ml-2">
          <Text type="subtitle2">{item.title.slice(0, 18)}...</Text>
          <Text type="capitalised">{item.category}</Text>
        </View>

        <View className="items-end">
          <Text>
            {isIncome ? '+' : '-'}
            {formatCurrency(item.amount)}
          </Text>
          <Text>{formatDate(item.createdAt)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="p-3 border-l-2 border-l-red-600"
        onPress={() => onDelete(item._id)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Transactions;
