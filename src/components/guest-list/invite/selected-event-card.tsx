"use client";

import { useTranslations } from "next-intl";
import { Clock, MapPin, Share2, Users, Receipt } from "lucide-react";

export function SelectedEventCard({ date }: { date: Date | undefined }) {
  const t = useTranslations("InviteGuest");

  // Mock data that could eventually change based on 'date' prop
  const event = {
    title: "Neon Retro Night",
    date: "Sat, Nov 18",
    time: "22:00 - 04:00",
    venue: "Main Room",
    capacity: "850 Guests",
    guestlist: "Open",
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-fit">
      {/* Event Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("selectedEvent")}</h3>
        <button className="text-sm font-bold text-[#EAB308] hover:text-[#C59D08] transition-colors">
            {t("editEvent")}
        </button>
      </div>

      {/* Image Block */}
      <div className="mx-6 h-48 bg-gray-50 rounded-2xl relative overflow-hidden group border border-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                 <span className="text-gray-400 text-xs">IMG</span>
             </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-8 space-y-8">
        <div className="flex items-start justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">{event.title}</h2>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {/* Date */}
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-lg">📅</span>
                </div>
                <div>
                     {/* If a date is selected, show it, else show default mock */}
                    <p className="font-extrabold text-[#EAB308] text-sm leading-tight">
                        {date ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'}) : event.date}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">DATE</span>
                </div>
            </div>

            {/* Time */}
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                    <p className="font-extrabold text-sm text-gray-900 leading-tight">{event.time}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{t("time")}</span>
                </div>
            </div>

             {/* Venue */}
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                    <p className="font-extrabold text-sm text-gray-900 leading-tight">{event.venue}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{t("venue")}</span>
                </div>
            </div>

             {/* Capacity */}
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                    <p className="font-extrabold text-sm text-gray-900 leading-tight">{event.capacity}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{t("capacity")}</span>
                </div>
            </div>

            {/* Guestlist Status */}
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                    <p className="font-extrabold text-sm text-gray-900 leading-tight">{event.guestlist}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{t("guestlist")}</span>
                </div>
            </div>
        </div>
      </div>
      
        {/* Footer Stats similar to design */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <div>{t("invitesSent")}: <span className="text-gray-900 ml-1">0</span></div>
          <div>{t("rsvp")}: <span className="text-gray-900 ml-1">0</span></div>
      </div>
    </div>
  );
}
