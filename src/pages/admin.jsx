// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { LayoutDashboard, UtensilsCrossed, ReceiptText, Store, Bell, TrendingUp, ShoppingBag, Clock, CheckCircle2, ChefHat, ArrowRight } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { AdminTabBar } from '@/components/AdminTabBar';
const TODAY_ORDERS = [{
  id: 'A20260914-001',
  type: '当天',
  items: '红烧牛肉面 x1, 丝袜奶茶 x1',
  amount: 33,
  status: 'pending',
  time: '12:30'
}, {
  id: 'A20260914-002',
  type: '预约',
  items: '日式咖喱鸡排饭 x2',
  amount: 56,
  status: 'cooking',
  time: '09-15 18:00'
}, {
  id: 'A20260914-003',
  type: '当天',
  items: '酸菜鱼片 x1, 芒果西米露 x1',
  amount: 45,
  status: 'done',
  time: '11:15'
}];
export default function AdminPage(props) {
  const {
    toast
  } = useToast();
  const [orders, setOrders] = useState(TODAY_ORDERS);
  const pending = orders.filter(o => o.status === 'pending').length;
  const cooking = orders.filter(o => o.status === 'cooking').length;
  const done = orders.filter(o => o.status === 'done').length;
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  const handleStatus = (id, next) => {
    setOrders(prev => prev.map(o => o.id === id ? {
      ...o,
      status: next
    } : o));
    const label = next === 'done' ? '已标记完成' : next === 'cooking' ? '开始备餐' : '已取消';
    toast({
      title: '订单更新',
      description: `${id} ${label}`
    });
  };
  return <div className="min-h-screen bg-[#FAF3EC] font-['Noto_Serif_SC'] text-[#1B1A16] pb-24">
      <header className="bg-gradient-to-br from-[#1B1A16] to-[#370617] px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E85D04] flex items-center justify-center shadow-lg shadow-[#E85D04]/30">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">老街食肆 · 商家后台</h1>
              <p className="text-[#F7E1D7]/50 text-xs">营业中 · 今日 09:00 - 21:00</p>
            </div>
          </div>
          <button onClick={() => toast({
          title: '通知',
          description: '暂无新消息'
        })} className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#F7E1D7]" />
            {pending > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E85D04] text-white text-[10px] flex items-center justify-center font-bold">{pending}</span>}
          </button>
        </div>
      </header>

      <main className="px-4 -mt-2 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#370617]/5">
            <div className="flex items-center gap-2 text-[#E85D04]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs text-[#370617]/50">今日营业额</span>
            </div>
            <p className="font-['Playfair_Display'] text-2xl font-bold text-[#1B1A16] mt-1">¥{revenue}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#370617]/5">
            <div className="flex items-center gap-2 text-[#E85D04]">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs text-[#370617]/50">订单总数</span>
            </div>
            <p className="font-['Playfair_Display'] text-2xl font-bold text-[#1B1A16] mt-1">{orders.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#370617]/5">
          <h2 className="text-sm font-bold text-[#1B1A16] mb-3">订单状态</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center py-2 rounded-xl bg-[#FFF8F0]">
              <Clock className="w-5 h-5 text-[#E85D04] mb-1" />
              <span className="text-xl font-bold text-[#1B1A16]">{pending}</span>
              <span className="text-[11px] text-[#370617]/40">待处理</span>
            </div>
            <div className="flex flex-col items-center py-2 rounded-xl bg-[#FFF8F0]">
              <ChefHat className="w-5 h-5 text-[#E85D04] mb-1" />
              <span className="text-xl font-bold text-[#1B1A16]">{cooking}</span>
              <span className="text-[11px] text-[#370617]/40">备餐中</span>
            </div>
            <div className="flex flex-col items-center py-2 rounded-xl bg-[#FFF8F0]">
              <CheckCircle2 className="w-5 h-5 text-[#E85D04] mb-1" />
              <span className="text-xl font-bold text-[#1B1A16]">{done}</span>
              <span className="text-[11px] text-[#370617]/40">已完成</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'admin-menu',
          params: {}
        })} className="bg-[#E85D04] rounded-2xl p-4 flex items-center justify-between shadow-md shadow-[#E85D04]/20 active:scale-95 transition-all">
            <div className="flex items-center gap-2 text-white">
              <UtensilsCrossed className="w-5 h-5" />
              <span className="font-bold text-sm">菜品管理</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </button>
          <button onClick={() => props.$w.utils.navigateTo({
          pageId: 'admin-orders',
          params: {}
        })} className="bg-[#1B1A16] rounded-2xl p-4 flex items-center justify-between shadow-md active:scale-95 transition-all">
            <div className="flex items-center gap-2 text-white">
              <ReceiptText className="w-5 h-5" />
              <span className="font-bold text-sm">订单管理</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#370617]/5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#1B1A16]">最新订单</h2>
            <button onClick={() => props.$w.utils.navigateTo({
            pageId: 'admin-orders',
            params: {}
          })} className="text-xs text-[#E85D04]">查看全部</button>
          </div>
          <div className="space-y-2">
            {orders.slice(0, 3).map(o => <div key={o.id} className="flex items-center justify-between py-2 border-b border-[#370617]/5 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1B1A16] truncate">{o.items}</p>
                  <p className="text-[11px] text-[#370617]/40">{o.id} · {o.type} · {o.time}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-sm font-bold text-[#E85D04]">¥{o.amount}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${o.status === 'pending' ? 'bg-[#E85D04]/10 text-[#E85D04]' : o.status === 'cooking' ? 'bg-[#FFB703]/15 text-[#FFB703]' : 'bg-[#2A9D8F]/10 text-[#2A9D8F]'}`}>
                    {o.status === 'pending' ? '待处理' : o.status === 'cooking' ? '备餐中' : '已完成'}
                  </span>
                </div>
              </div>)}
          </div>
        </div>
      </main>
      <AdminTabBar active="admin" $w={props.$w} />
    </div>;
}