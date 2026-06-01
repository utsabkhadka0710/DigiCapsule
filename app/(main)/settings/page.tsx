import Link from "next/link";
import { ArrowRight, Crown, ShieldAlert } from "lucide-react";

import { GetCurrentPlan } from "@/actions/user-details";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteAccountAlert } from "./components/delete-account-alert";

const planLabels = {
  free: "Free",
  basic: "Basic",
  premium: "Premium",
} as const;

const ProfilePage = async () => {
  const resp = await GetCurrentPlan();
  const currentPlan = resp.success ? resp.data : "free";
  const planLabel =
    planLabels[currentPlan as keyof typeof planLabels] ?? "Free";
  const isPremiumPlan = currentPlan === "premium";

  return (
    <div className="min-h-[90vh] px-4 py-10 md:min-h-[85vh] md:px-8 lg:min-h-[80vh] lg:px-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-text-secondary">
            Account settings
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Review your plan, upgrade when needed, and manage your account.
          </p>
        </div>

        <Card className="border-border-dark bg-surface-dark">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Crown size={18} />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  Current plan
                </CardTitle>
                <CardDescription className="mt-1 text-text-secondary">
                  Your account is currently on the {planLabel} plan.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 pt-0">
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border-dark bg-background/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-primary" size={16} />
                <span className="text-sm text-text-secondary">Plan status</span>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {planLabel}
              </span>
            </div>

            {!isPremiumPlan && (
              <Button asChild className="w-fit">
                <Link href="/plans">
                  Upgrade plan
                  <ArrowRight size={16} />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-border-dark bg-surface-dark">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-destructive">
              Delete account
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Your account will be permanently deleted, including your profile,
              capsules, and all account data.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <DeleteAccountAlert />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
