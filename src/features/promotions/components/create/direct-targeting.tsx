"use client";

import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Send, MessageSquare, Mail } from "lucide-react";
import { Switch } from "@/src/components/ui/switch";

export function DirectTargeting() {
    return (
        <Card className="p-8 rounded-[32px] border-none shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm space-y-8">
            <div className="space-y-2 pb-5 border-b border-border">
                <h2 className="text-xl font-black tracking-tight text-foreground flex items-center gap-3">
                    <Send className="w-5 h-5 text-primary" />
                    Direct Targeting
                </h2>
            </div>

            <div className="space-y-6">
                <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between group hover:bg-primary/10 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Push Notifications</p>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">Send directly to mobile apps</p>
                        </div>
                    </div>
                    <Switch className="data-[state=checked]:bg-primary" />
                </div>

                <div className="p-5 rounded-3xl bg-muted/5 border border-border flex items-center justify-between group hover:bg-muted/10 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Email Campaign</p>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">Automated email blasts</p>
                        </div>
                    </div>
                    <Switch />
                </div>

                <div className="pt-4 border-t border-border">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed">
                        * Notifications will be sent to <span className="text-primary">1,240</span> matching users instantly upon activation.
                    </p>
                </div>
            </div>
        </Card>
    );
}
