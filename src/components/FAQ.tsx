import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I register for events?",
    answer: "Navigate to the Events section, select your desired event, and click on 'Register Now'. Fill in your details and submit the form."
  },
  {
    question: "Are the workshops free?",
    answer: "Most of our workshops are free for students. Some premium workshops may have a nominal fee which will be mentioned in the event details."
  },
  {
    question: "How can I access internship opportunities?",
    answer: "Visit the Internships section from the navigation menu. Browse available opportunities and apply directly through our platform."
  },
  {
    question: "What is the mentorship program?",
    answer: "Our mentorship program connects you with industry experts who guide you through your learning journey, career decisions, and skill development."
  },
  {
    question: "How do I track my learning progress?",
    answer: "Once you create an account and enroll in courses, you can track your progress through your student dashboard."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold gradient-text">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Find quick answers to common questions
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border-border/50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;