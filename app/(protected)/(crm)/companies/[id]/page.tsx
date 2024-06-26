import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { currentUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import FormError from "@/components/ui/form-error";
import Container from "@/components/utils/container";
import { showUsers } from "@/actions/personal/show-users";
import HeaderForCRM from "@/components/utils/header-for-crm";
import DealList from "@/components/page/company-page/deal-list";
import UpdateForm from "@/components/page/company-create/update-form";
import ContactsList from "@/components/page/company-page/contact-list";
import { showOneCompanyById } from "@/actions/company/show-one-company";
import ContactCreate from "@/components/page/company-page/contact-create";
import ResetResponsibleButton from "@/components/page/company-page/buttons/reset-responsible";
import { UserRole } from "@prisma/client";

const ComanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await showOneCompanyById(params.id);
  const data = await showUsers({});
  const user = await currentUser();
  return (
    <Container>
      {company ? (
        <>
          <div className="flex items-center gap-4 lg:col-span-3">
            <BackButton />
            <HeaderForCRM text={company?.name} />
            <div className="ml-auto flex flex-col sm:flex-row gap-4 items-center">
              {user?.role === UserRole.ADMIN ? (
                <ResetResponsibleButton
                  users={data?.users}
                  userId={company?.userId}
                  companyId={company?.id}
                />
              ) : (
                <Badge variant="outline">{user?.name}</Badge>
              )}
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href={`/companies/${company?.id}/deal`}>
                  Создать сделку
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 order-2 lg:order-1">
            <UpdateForm company={company} />
          </div>
          <div className="grid gap-6 order-1 lg:order-2 lg:sticky lg:top-0">
            <DealList dealList={company?.deals} companyId={company?.id} />
            <ContactsList contacts={company?.contacts} />
            <ContactCreate companyId={company?.id} />
          </div>
        </>
      ) : (
        <FormError message="Не достаточно прав на просмотр данного ресурса" />
      )}
    </Container>
  );
};

export default ComanyPage;
