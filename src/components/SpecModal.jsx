// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { X, Plus, Minus, Check } from 'lucide-react';

export function SpecModal({
  item,
  onClose,
  onConfirm
}) {
  const [selectedSpecs, setSelectedSpecs] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (item) {
      setSelectedSpecs({});
      setQuantity(1);
    }
  }, [item]);
  if (!item) return null;
  const handleSpecSelect = (label, option) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [label]: option
    }));
  };
  const specSummary = Object.values(selectedSpecs).join(' / ');
  return <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] animate-spec-up">
        <div className="bg-white rounded-t-3xl max-h-[80vh] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="relative px-5 pt-5 pb-4 border-b border-[#370617]/5">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#370617]/5 flex items-center justify-center hover:bg-[#370617]/10 transition-colors">
              <X className="w-4 h-4 text-[#370617]/60" />
            </button>
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#370617] leading-tight truncate">{item.name}</h3>
                <p className="text-xs text-[#370617]/50 mt-0.5 line-clamp-1">{item.desc}</p>
                <div className="flex items-baseline gap-0.5 mt-1">
                  <span className="text-xs font-bold text-[#E85D04]">¥</span>
                  <span className="font-['Playfair_Display'] text-xl font-bold text-[#E85D04]">{item.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specs Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {item.specs && item.specs.length > 0 ? item.specs.map(spec => <div key={spec.label}>
                <h4 className="font-['Playfair_Display'] text-sm font-bold text-[#370617] mb-2.5">{spec.label}</h4>
                <div className="flex flex-wrap gap-2">
                  {spec.options.map(opt => {
                const isActive = selectedSpecs[spec.label] === opt;
                return <button key={opt} onClick={() => handleSpecSelect(spec.label, opt)} className={'text-sm px-4 py-2 rounded-full border transition-all ' + (isActive ? 'border-[#E85D04] bg-[#E85D04]/5 text-[#E85D04] font-medium' : 'border-[#370617]/8 text-[#370617]/60 hover:border-[#E85D04]/20')}>
                      {opt}
                    </button>;
              })}
                </div>
              </div>) : <p className="text-sm text-[#370617]/40 text-center py-4">该商品暂无可选项</p>}
          </div>

          {/* Footer */}
          <div className="px-5 pt-3 pb-6 border-t border-[#370617]/5">
            <div className="flex items-center justify-between gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-2 bg-[#FFF8F0] rounded-full px-1.5 py-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white border border-[#E85D04]/20 text-[#E85D04] flex items-center justify-center hover:bg-[#E85D04] hover:text-white active:scale-90 transition-all">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-bold text-[#370617] min-w-[1.5rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-[#E85D04] text-white flex items-center justify-center hover:bg-[#E85D04]/90 active:scale-90 transition-all">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Confirm */}
              <button onClick={() => onConfirm(selectedSpecs, quantity)} className="flex-1 py-3.5 rounded-2xl text-white font-medium transition-all active:scale-[0.98] bg-[#E85D04] hover:bg-[#E85D04]/90 shadow-lg shadow-[#E85D04]/20 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>加入购物车 {specSummary ? '· ' + specSummary : ''}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{".animate-spec-up{animation:specUp .3s ease-out}@keyframes specUp{from{transform:translateY(100%)}to{transform:translateY(0)}}.line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}"}</style>
    </>;
}