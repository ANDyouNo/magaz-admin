import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Возвращаем оригинальный Input
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

interface SaleData {
  date: string;
  amount: number;
}

interface WeekdaySales {
  day: string;
  sales: number;
}

interface HourlySales {
  time: string;
  sales: number;
}

interface ChannelSales {
  name: string;
  value: number;
}

interface CatalogItem {
  id: string;
  metal: string;
  weight: number;
  type: string;
}

const CatalogForm = React.memo(
  ({ onAddItem }: { onAddItem: (item: CatalogItem) => void }) => {
    const [newItem, setNewItem] = useState<CatalogItem>({
      id: "",
      metal: "",
      weight: 0,
      type: "",
    });
    const idRef = useRef<HTMLInputElement | null>(null);
    const metalRef = useRef<HTMLInputElement | null>(null);
    const weightRef = useRef<HTMLInputElement | null>(null);
    const typeRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (
      field: keyof CatalogItem,
      value: string | number,
      ref: React.RefObject<HTMLInputElement | null>
    ) => {
      setNewItem((prev) => ({ ...prev, [field]: value }));
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      }, 0);
    };

    const handleAddItem = () => {
      if (newItem.id && newItem.metal && newItem.weight && newItem.type) {
        onAddItem(newItem);
        setNewItem({ id: "", metal: "", weight: 0, type: "" });
      }
    };

    return (
      <div className="flex gap-4 mb-8">
        <Input
          ref={idRef}
          placeholder="Артикул"
          value={newItem.id}
          onChange={(e) => handleChange("id", e.target.value, idRef)}
          className="max-w-xs bg-black text-zinc-100 border-zinc-800"
        />
        <Input
          ref={metalRef}
          placeholder="Металл"
          value={newItem.metal}
          onChange={(e) => handleChange("metal", e.target.value, metalRef)}
          className="max-w-xs bg-black text-zinc-100 border-zinc-800"
        />
        <Input
          ref={weightRef}
          type="number"
          placeholder="Вес"
          value={newItem.weight || ""}
          onChange={(e) =>
            handleChange("weight", parseFloat(e.target.value) || 0, weightRef)
          }
          className="max-w-xs bg-black text-zinc-100 border-zinc-800"
        />
        <Input
          ref={typeRef}
          placeholder="Тип изделия"
          value={newItem.type}
          onChange={(e) => handleChange("type", e.target.value, typeRef)}
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
    );
  }
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sales" | "catalog">("sales");
  const [dailySales] = useState<SaleData[]>([
    { date: "2024-02-10", amount: 15000 },
    { date: "2024-02-11", amount: 18000 },
    { date: "2024-02-12", amount: 12000 },
    { date: "2024-02-13", amount: 20000 },
    { date: "2024-02-14", amount: 25000 },
  ]);

  const [weekdaySales] = useState<WeekdaySales[]>([
    { day: "Понедельник", sales: 15000 },
    { day: "Вторник", sales: 18000 },
    { day: "Среда", sales: 20000 },
    { day: "Четверг", sales: 22000 },
    { day: "Пятница", sales: 25000 },
    { day: "Суббота", sales: 30000 },
    { day: "Воскресенье", sales: 28000 },
  ]);

  const [hourlySales] = useState<HourlySales[]>([
    { time: "9:00", sales: 5000 },
    { time: "11:00", sales: 8000 },
    { time: "13:00", sales: 12000 },
    { time: "15:00", sales: 15000 },
    { time: "17:00", sales: 18000 },
    { time: "19:00", sales: 10000 },
  ]);

  const [channelSales] = useState<ChannelSales[]>([
    { name: "Онлайн", value: 60 },
    { name: "Офлайн", value: 40 },
  ]);

  const CHANNEL_COLORS = ["#60A5FA", "#F472B6"];

  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([
    { id: "ART001", metal: "AG 925", weight: 5.2, type: "Кольцо" },
    { id: "ART002", metal: "AU 585", weight: 3.8, type: "Цепочка" },
    { id: "ART003", metal: "AG 925", weight: 4.1, type: "Браслет" },
    { id: "ART004", metal: "AU 750", weight: 7.5, type: "Серьги" },
    { id: "ART005", metal: "AG 999", weight: 2.3, type: "Подвеска" },
    { id: "ART006", metal: "PT 950", weight: 6.7, type: "Перстень" },
    { id: "ART007", metal: "AU 585", weight: 5.0, type: "Крестик" },
    { id: "ART008", metal: "AG 925", weight: 3.2, type: "Пусеты" },
    { id: "ART009", metal: "AU 750", weight: 4.9, type: "Часы" },
    { id: "ART010", metal: "PT 950", weight: 7.1, type: "Запонки" },
    { id: "ART011", metal: "AG 999", weight: 2.8, type: "Медальон" },
    { id: "ART012", metal: "AU 585", weight: 6.2, type: "Обручальное кольцо" },
    { id: "ART013", metal: "AG 925", weight: 3.5, type: "Кулон" },
    { id: "ART014", metal: "PT 950", weight: 5.8, type: "Цепочка" },
    { id: "ART015", metal: "AU 750", weight: 4.4, type: "Серьги" },
    { id: "ART016", metal: "AG 925", weight: 7.0, type: "Подвеска" },
    { id: "ART017", metal: "AU 585", weight: 5.7, type: "Перстень" },
    { id: "ART018", metal: "PT 950", weight: 6.9, type: "Кольцо" },
    { id: "ART019", metal: "AG 999", weight: 3.0, type: "Браслет" },
    { id: "ART020", metal: "AU 750", weight: 5.3, type: "Обручальное кольцо" },
  ]);

  const handleAddItem = (item: CatalogItem) => {
    setCatalogItems((prev) => [...prev, item]);
  };

  const handleDeleteItem = (itemId: string) => {
    setCatalogItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const SalesStatistics = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-zinc-100 mb-8">
        Статистика продаж
      </h1>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-black border border-zinc-800">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              Продажи за день
            </h2>
            <div className="flex justify-center">
              <LineChart width={500} height={300} data={dailySales}>
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
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#fff" />
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-zinc-800">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              Продажи по дням недели
            </h2>
            <div className="flex justify-center">
              <BarChart width={500} height={300} data={weekdaySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#e4e4e7" />
                <YAxis stroke="#e4e4e7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#fff" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-zinc-800">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              Продажи по времени дня
            </h2>
            <div className="flex justify-center">
              <BarChart width={500} height={300} data={hourlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" stroke="#e4e4e7" />
                <YAxis stroke="#e4e4e7" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#fff" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-zinc-800">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">
              Распределение каналов продаж
            </h2>
            <div className="flex justify-center">
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
                  {channelSales.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CatalogEditor = () => (
    <div className="relative">
      <div className="fixed top-0 left-16 right-0 bg-black z-40 border-b border-zinc-800">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-8">
            Редактор каталога
          </h1>
          <CatalogForm onAddItem={handleAddItem} />
        </div>
      </div>

      <div className="pt-48 p-8">
        <Card className="bg-black border border-zinc-800">
          <CardContent className="pt-6">
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-zinc-100 bg-black sticky top-0">
                      Артикул
                    </TableHead>
                    <TableHead className="text-zinc-100 bg-black sticky top-0">
                      Металл
                    </TableHead>
                    <TableHead className="text-zinc-100 bg-black sticky top-0">
                      Вес
                    </TableHead>
                    <TableHead className="text-zinc-100 bg-black sticky top-0">
                      Тип изделия
                    </TableHead>
                    <TableHead className="text-zinc-100 bg-black sticky top-0">
                      Действия
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogItems.map((item) => (
                    <TableRow key={item.id} className="border-zinc-800">
                      <TableCell className="text-zinc-100">{item.id}</TableCell>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      <div className="fixed left-0 top-0 bottom-0 w-16 border-r border-zinc-800 p-4 flex flex-col justify-between bg-black z-50">
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

      <div className="flex-1 ml-16">
        {activeTab === "sales" && <SalesStatistics />}
        {activeTab === "catalog" && <CatalogEditor />}
      </div>
    </div>
  );
};

export default App;
