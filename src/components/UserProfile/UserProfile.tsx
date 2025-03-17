import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { LogOut, ShoppingBag, UserCircle } from "lucide-react";

const UserProfile: React.FC = () => {
  // Статистика продаж пользователя
  const userSales = [
    { date: "Янв", sales: 120000 },
    { date: "Фев", sales: 135000 },
    { date: "Мар", sales: 110000 },
    { date: "Апр", sales: 145000 },
    { date: "Май", sales: 160000 },
    { date: "Июн", sales: 175000 },
  ];

  // Последние заказы пользователя
  const recentOrders = [
    {
      id: "ORD-7651",
      date: "12.03.2025",
      client: "Ирина Петрова",
      items: 3,
      amount: 45000,
      status: "Завершен",
    },
    {
      id: "ORD-7650",
      date: "10.03.2025",
      client: "Дмитрий Козлов",
      items: 1,
      amount: 23500,
      status: "Завершен",
    },
    {
      id: "ORD-7642",
      date: "05.03.2025",
      client: "Елена Сидорова",
      items: 2,
      amount: 67800,
      status: "В обработке",
    },
  ];

  const handleLogout = () => {
    // Логика выхода из аккаунта
    console.log("Выход из системы");
  };

  // Определение цвета статуса заказа
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Завершен":
        return "text-green-400";
      case "В обработке":
        return "text-blue-400";
      case "Отменен":
        return "text-red-400";
      default:
        return "text-zinc-100";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          Профиль пользователя
        </h1>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-zinc-100 hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </Button>
      </div>

      <div className="flex items-center mb-8 border-b border-zinc-800 pb-4">
        <div className="bg-zinc-800 rounded-full w-16 h-16 flex items-center justify-center mr-4">
          <UserCircle className="h-12 w-12 text-zinc-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            Алексей Смирнов
          </h2>
          <p className="text-zinc-400">Старший менеджер</p>
        </div>
      </div>

      {/* График продаж пользователя */}
      <Card className="bg-black border border-zinc-800 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-zinc-100">
            Статистика продаж
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={900} height={300} data={userSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" stroke="#e4e4e7" />
            <YAxis stroke="#e4e4e7" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#60A5FA"
              strokeWidth={2}
            />
          </LineChart>
        </CardContent>
      </Card>

      {/* Последние заказы */}
      <Card className="bg-black border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-zinc-100">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Последние заказы
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-100">№ Заказа</TableHead>
                <TableHead className="text-zinc-100">Дата</TableHead>
                <TableHead className="text-zinc-100">Клиент</TableHead>
                <TableHead className="text-zinc-100">Позиций</TableHead>
                <TableHead className="text-zinc-100">Сумма</TableHead>
                <TableHead className="text-zinc-100">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="border-zinc-800">
                  <TableCell className="text-zinc-100">{order.id}</TableCell>
                  <TableCell className="text-zinc-100">{order.date}</TableCell>
                  <TableCell className="text-zinc-100">
                    {order.client}
                  </TableCell>
                  <TableCell className="text-zinc-100">{order.items}</TableCell>
                  <TableCell className="text-zinc-100">
                    {order.amount.toLocaleString()} ₽
                  </TableCell>
                  <TableCell className={getStatusColor(order.status)}>
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
