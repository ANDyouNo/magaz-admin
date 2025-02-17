import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartBar, Boxes, User, Trash2 } from "lucide-react";

// Types
interface SaleData {
  date: string;
  amount: number;
}

interface CatalogItem {
  id: string;
  metal: string;
  weight: number;
  type: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const [dailySales] = useState<SaleData[]>([
    { date: "2024-02-10", amount: 15000 },
    { date: "2024-02-11", amount: 18000 },
    { date: "2024-02-12", amount: 12000 },
    { date: "2024-02-13", amount: 20000 },
    { date: "2024-02-14", amount: 25000 },
  ]);

  const [weekdaySales] = useState([
    { day: "Понедельник", sales: 15000 },
    { day: "Вторник", sales: 18000 },
    { day: "Среда", sales: 20000 },
    { day: "Четверг", sales: 22000 },
    { day: "Пятница", sales: 25000 },
    { day: "Суббота", sales: 30000 },
    { day: "Воскресенье", sales: 28000 },
  ]);

  const [hourlySales] = useState([
    { time: "9:00", sales: 5000 },
    { time: "11:00", sales: 8000 },
    { time: "13:00", sales: 12000 },
    { time: "15:00", sales: 15000 },
    { time: "17:00", sales: 18000 },
    { time: "19:00", sales: 10000 },
  ]);

  const [channelSales] = useState([
    { name: "Онлайн", value: 60 },
    { name: "Офлайн", value: 40 },
  ]);

  const CHANNEL_COLORS = ["#60A5FA", "#F472B6"];

  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([
    { id: "ART001", metal: "AG 925", weight: 5.2, type: "Кольцо" },
    { id: "ART002", metal: "AU 585", weight: 3.8, type: "Цепочка" },
    { id: "ART003", metal: "AG 925", weight: 4.1, type: "Браслет" },
  ]);

  const [newItem, setNewItem] = useState<CatalogItem>({
    id: "",
    metal: "",
    weight: 0,
    type: "",
  });

  const handleAddItem = () => {
    setCatalogItems([...catalogItems, newItem]);
    setNewItem({ id: "", metal: "", weight: 0, type: "" });
  };

  const handleDeleteItem = (itemId: string) => {
    setCatalogItems(catalogItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-16 border-r border-zinc-800 p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className={`p-2 ${activeTab === "sales" ? "bg-zinc-800" : ""}`}
            onClick={() => setActiveTab("sales")}
          >
            <ChartBar className="h-6 w-6 text-zinc-100" />
          </Button>
          <Button
            variant="ghost"
            className={`p-2 ${activeTab === "catalog" ? "bg-zinc-800" : ""}`}
            onClick={() => setActiveTab("catalog")}
          >
            <Boxes className="h-6 w-6 text-zinc-100" />
          </Button>
        </div>
        <Button variant="ghost" className="p-2">
          <User className="h-6 w-6 text-zinc-100" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "sales" && (
          <>
            <h1 className="text-3xl font-bold text-zinc-100 mb-8">
              Статистика продаж
            </h1>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              <Card className="bg-black border border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Продажи за день
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <LineChart width={500} height={300} data={dailySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="date" stroke="#e4e4e7" />
                    <YAxis stroke="#e4e4e7" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#fff" />
                  </LineChart>
                </CardContent>
              </Card>

              <Card className="bg-black border border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Продажи по дням недели
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <BarChart width={500} height={300} data={weekdaySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="day" stroke="#e4e4e7" />
                    <YAxis stroke="#e4e4e7" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sales" fill="#fff" />
                  </BarChart>
                </CardContent>
              </Card>

              <Card className="bg-black border border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Продажи по времени дня
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <BarChart width={500} height={300} data={hourlySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="time" stroke="#e4e4e7" />
                    <YAxis stroke="#e4e4e7" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="sales" fill="#fff" />
                  </BarChart>
                </CardContent>
              </Card>

              <Card className="bg-black border border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Распределение каналов продаж
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={channelSales}
                      cx={200}
                      cy={150}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {channelSales.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                      }}
                    />
                  </PieChart>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "catalog" && (
          <>
            <h1 className="text-3xl font-bold text-zinc-100 mb-8">
              Редактор каталога
            </h1>
            <Card className="bg-black border border-zinc-800">
              <CardContent className="pt-6">
                <div className="mb-8 flex gap-4">
                  <Input
                    placeholder="Артикул"
                    value={newItem.id}
                    onChange={(e) =>
                      setNewItem({ ...newItem, id: e.target.value })
                    }
                    className="max-w-xs bg-black text-zinc-100 border-zinc-800"
                  />
                  <Input
                    placeholder="Металл"
                    value={newItem.metal}
                    onChange={(e) =>
                      setNewItem({ ...newItem, metal: e.target.value })
                    }
                    className="max-w-xs bg-black text-zinc-100 border-zinc-800"
                  />
                  <Input
                    type="number"
                    placeholder="Вес"
                    value={newItem.weight || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        weight: parseFloat(e.target.value),
                      })
                    }
                    className="max-w-xs bg-black text-zinc-100 border-zinc-800"
                  />
                  <Input
                    placeholder="Тип изделия"
                    value={newItem.type}
                    onChange={(e) =>
                      setNewItem({ ...newItem, type: e.target.value })
                    }
                    className="max-w-xs bg-black text-zinc-100 border-zinc-800"
                  />
                  <Button
                    onClick={handleAddItem}
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  >
                    Добавить
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-zinc-100">Артикул</TableHead>
                      <TableHead className="text-zinc-100">Металл</TableHead>
                      <TableHead className="text-zinc-100">Вес</TableHead>
                      <TableHead className="text-zinc-100">
                        Тип изделия
                      </TableHead>
                      <TableHead className="text-zinc-100">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catalogItems.map((item) => (
                      <TableRow key={item.id} className="border-zinc-800">
                        <TableCell className="text-zinc-100">
                          {item.id}
                        </TableCell>
                        <TableCell className="text-zinc-100">
                          {item.metal}
                        </TableCell>
                        <TableCell className="text-zinc-100">
                          {item.weight}
                        </TableCell>
                        <TableCell className="text-zinc-100">
                          {item.type}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-zinc-100 hover:text-red-300 hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
