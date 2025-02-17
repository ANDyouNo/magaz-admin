import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  // Sample data - replace with real data from your backend
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="sales">Статистика продаж</TabsTrigger>
          <TabsTrigger value="catalog">Редактор каталога</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Продажи за день</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart width={500} height={300} data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Продажи по дням недели</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart width={500} height={300} data={weekdaySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="catalog">
          <Card>
            <CardHeader>
              <CardTitle>Редактор каталога</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8 flex gap-4">
                <Input
                  placeholder="Артикул"
                  value={newItem.id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, id: e.target.value })
                  }
                  className="max-w-xs"
                />
                <Input
                  placeholder="Металл"
                  value={newItem.metal}
                  onChange={(e) =>
                    setNewItem({ ...newItem, metal: e.target.value })
                  }
                  className="max-w-xs"
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
                  className="max-w-xs"
                />
                <Input
                  placeholder="Тип изделия"
                  value={newItem.type}
                  onChange={(e) =>
                    setNewItem({ ...newItem, type: e.target.value })
                  }
                  className="max-w-xs"
                />
                <Button onClick={handleAddItem}>Добавить</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Артикул</TableHead>
                    <TableHead>Металл</TableHead>
                    <TableHead>Вес</TableHead>
                    <TableHead>Тип изделия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.metal}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
